const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const {
  reentryService,
  educationalYearService,
  studentService,
  taajilService,
  semesterService,
  studentListService,
} = require('../services');
const { findEligibleNextSemesterAfterConversion } = require('../utils/global');

const createReentry = catchAsync(async (req, res) => {
  const { studentId, reason } = req.body;
  // check student id if it is correct student id
  const student = await studentService.getStudent(studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, `student not found with id ${studentId}`);
  // find student all taajils. if student has Taajils or Not
  const studentAllTajils = await taajilService.findStudentAllTajils(studentId);
  if (studentAllTajils.length <= 0) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Student does not have any Taajil');
  // find student all student lists
  const studentList = await studentListService.findAllStudentListOfSingleStudent(studentId);
  // if student has not registered to any semester we will give reentry
  if (studentList.length < 0)
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      `Student is not registered in any semester. Student should be registered in 1st semester of ${student.admissionYear}} educational year!`
    );

  // Here starts our actual validation and code:

  const generalTaajil = await taajilService.findTaajilByStudentIdAndType(studentId, 'taajil');
  const specialTaajil = await taajilService.findTaajilByStudentIdAndType(studentId, 'special_taajil');

  // Now, if the students wants reentry for general taajil reason, check their taajil record first:
  if (reason === 'taajil' && !generalTaajil) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Student has not taken any taajil yet.');
  } else if (reason === 'special_taajil' && !specialTaajil) {
    // If user tried giving reentry for special_taajil but the student has not taken any special taajil
    throw new ApiError(httpStatus.NOT_FOUND, 'Student has not taken any special taajil yet.');
  }

  const reentryExistForGeneralTaail = await reentryService.findReentryByStudentIdAndReason(studentId, 'taajil');
  const reentryExistForSpecialTaail = await reentryService.findReentryByStudentIdAndReason(studentId, 'special_taajil');
  if (reason === 'taajil' && generalTaajil && reentryExistForGeneralTaail) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Student already has taken reentry for common taajil');
  } else if (reason === 'special_taajil' && specialTaajil && reentryExistForSpecialTaail) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Student already has taken reentry for special taajil.');
  }

  // check if one year has been passed
  const latestSemesterIdOfTaajil = specialTaajil?.semesterId || generalTaajil?.semesterId;

  // Get the semester that the student should/will start upcoming year.
  const eligibleNextSemester = await findEligibleNextSemesterAfterConversion(latestSemesterIdOfTaajil);

  // Get current on-going year and first-half
  const {
    year: currentEducationalYear,
    firstHalf,
    id: currentEducationalYearId,
  } = await educationalYearService.getCurrentEducationalYear();

  // Get eligible next semester year record (Year record)
  const eligibleNextSemesterYear = await educationalYearService.getEducationalYear(eligibleNextSemester.educationalYearId);

  // Check if one year has passed.
  if (currentEducationalYear != eligibleNextSemesterYear.year) {
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      `Student can only take reentry at ${eligibleNextSemesterYear.year} educational year`
    );
  }

  req.body.educationalYearId = currentEducationalYearId;
  req.body.semesterId = eligibleNextSemester.id;

  const reentry = await reentryService.createReentry(req.body);

  // Next up, register student in the studentsList
  // add student in the StudentsList for eligible next semester
  await studentListService.createStudentList({
    studentId,
    semesterId: eligibleNextSemester.id,
  });

  return res.status(httpStatus.CREATED).send(reentry);
});

const reentryStudents = catchAsync(async (req, res) => {
  if (req.query?.studentId) {
    const { studentId } = req.query;
    const results = await reentryService.findReentryByStudentId(studentId);
    if (!results) throw new ApiError(httpStatus.NOT_FOUND, `Reentry Not Found With Student id ${studentId}`);
    return res.status(httpStatus.OK).send(results);
  } else if (req.query?.reentryId) {
    const { reentryId } = req.query;
    const results = await reentryService.findReentryById(reentryId);
    if (!results) throw new ApiError(httpStatus.NOT_FOUND, `Reentry Not Found with id ${reentryId}`);
    return res.status(httpStatus.OK).send(results);
  } else if (req.query?.kankorId) {
    const { kankorId } = req.query;
    const results = await reentryService.findReentryByStdKankorId(kankorId);
    if (!results) throw new ApiError(httpStatus.NOT_FOUND, `Reentry Not Found With Student Kankor id ${kankorId}`);
    return res.status(httpStatus.OK).send(results);
  }
  // calculate query parameters
  const page = req.query?.page ? req.query?.page : 1;
  const limit = req.query?.limit ? req.query?.limit : 2000;
  const offset = parseInt((page - 1) * limit, 10);

  if (req.query?.educationalYear) {
    const { educationalYear } = req.query;
    const educationalYearId = await educationalYearService.findEducationalYearByValue(educationalYear);
    if (!educationalYearId) throw new ApiError(httpStatus.NOT_FOUND, `${educationalYear} educationalYear not found`);
    const { count, rows } = await reentryService.findReentriesByYearId(limit, offset, educationalYearId);
    return res.status(httpStatus.OK).send({
      page: parseInt(page, 10),
      totalPages: Math.ceil(count / limit),
      total: count,
      results: rows,
    });
  }

  const { count, rows } = await reentryService.reentryStudents(limit, offset);
  return res.status(httpStatus.OK).send({
    page: parseInt(page, 10),
    totalPages: Math.ceil(count / limit),
    total: count,
    results: rows,
  });
});

const deleteReentry = catchAsync(async (req, res) => {
  const { id } = req.params;
  const reentry = await reentryService.findReentryById(id);
  if (!reentry) throw new ApiError(httpStatus.NOT_FOUND, `Reentry id of ${id} not found`);
  await reentryService.deleteReentry(reentry);
  return res.status(httpStatus.NO_CONTENT).send();
});

const updateReentry = catchAsync(async (req, res) => {
  const { id } = req.params;
  const reentry = await reentryService.findReentryById(id);
  if (!reentry) throw new ApiError(httpStatus.NOT_FOUND, `Reentry id of ${id} not found`);
  const results = await reentryService.updateReentry(reentry, req.body);
  return res.status(httpStatus.ACCEPTED).send(results);
});

module.exports = {
  createReentry,
  deleteReentry,
  updateReentry,
  reentryStudents,
};
