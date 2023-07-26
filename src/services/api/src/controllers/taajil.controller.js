const httpStatus = require('http-status');
const i18n = require('i18n');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {
  taajilService,
  educationalYearService,
  studentService,
  studentListService,
  reentryService,
  semesterService,
} = require('../services');
const { findSemesterYearAndHalf, matchStudentSemesterWithOnGoingSemester } = require('../utils/global');

const createTaajil = catchAsync(async (req, res) => {
  const { studentId, educationalYear, type } = req.body;
  // check student if the id of student is correct
  const student = await studentService.getStudent(studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('studentNotFound'));
  // find all student list of single student by student id
  const studentList = await studentListService.findAllStudentListOfSingleStudent(studentId);
  if (studentList.length <= 0)
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      i18n.__('studentNotRegisteredInAnySemester', { admissionYear: student.admissionYear })
    );

  // Prevent taking taajil for the second time
  const generalTaajil = await taajilService.findTaajilByStudentIdAndType(studentId, 'taajil');
  const specialTaajil = await taajilService.findTaajilByStudentIdAndType(studentId, 'special_taajil');

  if (generalTaajil && type === 'taajil') {
    // If student has taken general taajil, and tries taking it again.
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, i18n.__('cannotGiveGeneralTaajilAgain'));
  }

  if (specialTaajil && type === 'special_taajil') {
    // If student has taken special taajil, and tries taking it again.
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
    i18n.__('noSpecialTaajilAllowed'));
  }

  // Get current on-going year and first-half
  const { year: currentEducationalYear, id: currentEducationalYearId } =
    await educationalYearService.getCurrentEducationalYear();

  // Now, if the user tries taking special taajil but has not taken reentry for the first one:
  if (type === 'special_taajil' && !specialTaajil && generalTaajil) {
    // Check if reentry exists for the reason = 'taajil' in reentry table of the elected student
    const reentryExistForGeneralTaail = await reentryService.findReentryByStudentIdAndReason(studentId, 'taajil');
    if (!reentryExistForGeneralTaail)
      throw new ApiError(
        httpStatus.NOT_ACCEPTABLE,
        i18n.__('reentryForOldTaajilMissing'));
    

    // Plus, prevent if special_taajil is taking place before general taajil
    const { year } = await educationalYearService.getEducationalYear(generalTaajil.educationalYearId);
    if (currentEducationalYear <= year)
      throw new ApiError(
        httpStatus.NOT_ACCEPTABLE,
        i18n.__('taajilYearAndSemesterMismatch', { year, eligibleSemester: data.eligibleSemester })
        );
     
  }

  // check distance b/w current year and req.body.educationalYear (year the user selected).
  // if the distance is correct then it is clear that we don't give taajils in the past or future years;
  // The distance is correct if both currentYear and recieved year are equal.

  const { eligible: semesterMatched, message, data } = await matchStudentSemesterWithOnGoingSemester(studentId);
  if (!semesterMatched) {
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      i18n.__('taajilYearAndSemesterMismatch', { year: data.year, eligibleSemester: data.eligibleSemester })
      );
  }

  // If the user tried, taking special taajil for the first time before general taajil
  if (!generalTaajil && type === 'special_taajil') {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE,i18n.__('specialTaajilWithoutGeneralTaajil'));
  }

  // Validation Completed --- LET"S GO!

  // Get student on-going semester id
  const currentSemesterId = await studentListService.findStudentLatestSemesterId(studentId);

  // create new Taajil
  req.body.year = educationalYear;
  req.body.semesterId = currentSemesterId;
  const taajil = await taajilService.createTaajil(req.body);
  return res.status(httpStatus.CREATED).send(taajil);
});

const taajilStudents = catchAsync(async (req, res) => {
  if (req.query?.studentId) {
    const { studentId } = req.query;
    const results = await taajilService.findTaajilByStudentId(studentId);
    if (!results) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('taajilNotfoundWithStudentId', { studentId }));
    return res.status(httpStatus.OK).send(results);
  } else if (req.query?.taajilId) {
    const { taajilId } = req.query;
    const results = await taajilService.findTaajilById(taajilId);
    if (!results) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('taajilNotfoundWithId', { taajilId }));
    return res.status(httpStatus.OK).send(results);
  } else if (req.query?.kankorId) {
    const { kankorId } = req.query;
    const results = await taajilService.findTaajilByStdKankorId(kankorId);
    if (!results) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('taajilNotfoundWithKankorId', { kankorId }));
    return res.status(httpStatus.OK).send(results);
  }
  // calculate query parameters
  const page = req.query?.page ? req.query?.page : 1;
  const limit = req.query?.limit ? req.query?.limit : 2000;
  const offset = parseInt((page - 1) * limit, 10);

  if (req.query?.educationalYear) {
    const educationalYearId = await educationalYearService.findEducationalYearByValue(req.query.educationalYear);
    if (!educationalYearId) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('educationalYearNotFound'));
    const { count, rows } = await taajilService.findTaajilsByYearId(limit, offset, educationalYearId);
    return res.status(httpStatus.OK).send({
      page: parseInt(page, 10),
      totalPages: Math.ceil(count / limit),
      total: count,
      results: rows,
    });
  }

  const { count, rows } = await taajilService.taajilStudents(limit, offset);
  return res.status(httpStatus.OK).send({
    page: parseInt(page, 10),
    totalPages: Math.ceil(count / limit),
    total: count,
    results: rows,
  });
});

const getTaajil = catchAsync(async (req, res) => {
  const taajil = await taajilService.findTaajilById(req.params.taajilId);
  if (!taajil) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('taajilNotfound'));
  return res.status(httpStatus.OK).send(taajil);
});

const updateTaajil = catchAsync(async (req, res) => {
  const taajil = await taajilService.findTaajilById(req.params.taajilId);
  if (!taajil) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('taajilNotfound'));
  const results = await taajilService.updateTaajil(taajil, req.body);
  return res.status(httpStatus.ACCEPTED).send(results);
});

const deleteTaajil = catchAsync(async (req, res) => {
  const taajil = await taajilService.findTaajilByStudentId(req.params.studentId);
  if (!taajil) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('taajilNotfound'));
  await taajilService.deleteTaajil(taajil);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteTaajilById = catchAsync(async (req, res) => {
  const taajil = await taajilService.findTaajilById(req.params.taajilId);
  if (!taajil) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('taajilNotfound'));
  await taajilService.deleteTaajil(taajil);
  return res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getTaajil,
  createTaajil,
  deleteTaajil,
  updateTaajil,
  taajilStudents,
  deleteTaajilById,
};
