const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const {
  reentryService,
  educationalYearService,
  studentService,
  taajilService,
  semesterService,
  studentListService } = require('../services');

const createReentry = catchAsync(async (req, res) => {
  const { studentId } = req.body;
  // check student id if it is correct student id
  const student = await studentService.getStudent(studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, `student not found with id ${studentId}`);
  // find student all taajils. if student has Taajils or Not
  const studentAllTajils = await taajilService.findStudentAllTajils(studentId);
  if (studentAllTajils.length <= 0) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Student does not have any Taajil');
  // find student all student lists
  const studentList = await studentListService.findAllStudentListOfSingleStudent(studentId);
  // if student has not registered to any semester we will give reentry
  if (studentList.length < 0) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Student Needs to be Registered to any class');
  // if student does not have active Taajil OR student's previous semester is active
  if (!studentAllTajils[0].onGoing || studentList[0].onGoing) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'student does not have any active Taajil And he is enrolled in a semester');
  // check if one year has been passed
  const taajilEducationalYear = await educationalYearService.getEducationalYear(studentAllTajils[0].educationalYearId);
  const currentEducationalYear = await educationalYearService.getCurrentEducationalYear();
  const currentYear = currentEducationalYear.year;
  const taajilYear = taajilEducationalYear.year;
  if (currentYear <= taajilYear) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'student should wait until next year');
  // find semester which the student has taken Taajil
  const semesterTitleToStudent = (await semesterService.findSemesterById(studentList[0].semesterId)).title;
  const semesterIdToAddStudent = (await semesterService.findSemester({
    educationalYearId: currentEducationalYear.id,
    title: semesterTitleToStudent,
  })).id;
  // create new student list for student 
  await studentListService.createStudentList({
    studentId,
    semesterId: semesterIdToAddStudent,
  });
  await taajilService.updateTaajil(studentAllTajils[0], { 'onGoing': false });
  req.body.educationalYearId = currentEducationalYear.id;
  const reentry = await reentryService.createReentry(req.body);
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
  const offset = parseInt(((page - 1) * limit), 10);

  if (req.query?.educationalYear) {
    const { educationalYear } = req.query;
    const educationalYearId = await educationalYearService.findEducationalYearByValue(educationalYear);
    if (!educationalYearId) throw new ApiError(httpStatus.NOT_FOUND, `${educationalYear} educationalYear not found`);
    const { count, rows } = await reentryService.findReentriesByYearId(limit, offset, educationalYearId);
    return res.status(httpStatus.OK).send({
      page: parseInt(page, 10),
      totalPages: Math.ceil(count / limit),
      total: count,
      results: rows
    });
  }


  const { count, rows } = await reentryService.reentryStudents(limit, offset);
  return res.status(httpStatus.OK).send({
    page: parseInt(page, 10),
    totalPages: Math.ceil(count / limit),
    total: count,
    results: rows
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
