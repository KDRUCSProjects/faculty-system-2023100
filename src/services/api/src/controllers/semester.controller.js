const httpStatus = require('http-status');
const i18n = require('i18n');
const catchAsync = require('../utils/catchAsync');
const { semesterService, educationalYearService, subjectService } = require('../services');
const ApiError = require('../utils/ApiError');
const { getStatsBySemesterId } = require('../utils/semesters');

const createSemester = catchAsync(async (req, res) => {
  const year = await educationalYearService.getEducationalYear(req.body.educationalYearId);
  if (!year) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('semester.create.yearNotFound'));
  const semester = await semesterService.findSemester(req.body);
  if (semester) throw new ApiError(httpStatus.NOT_ACCEPTABLE, i18n.__('semester.create.alreadyCreated'));
  const results = await semesterService.createNewSemester(req.body);
  return res.status(httpStatus.CREATED).send(results);
});

const getSemester = catchAsync(async (req, res) => {
  const semester = await semesterService.findSemesterById(req.params.semesterId);

  if (!semester) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('semester.get.notFound'));

  const maleStats = await getStatsBySemesterId(req.params.semesterId, 'male');
  const femaleStats = await getStatsBySemesterId(req.params.semesterId, 'female');

  semester.dataValues.statistics = {
    male: maleStats,
    female: femaleStats,
  };

  return res.status(httpStatus.OK).send(semester);
});

const deleteSemester = catchAsync(async (req, res) => {
  const semester = await semesterService.findById(req.params.semesterId);
  if (!semester) throw new ApiError(httpStatus.NOT_FOUND,  i18n.__('semester.delete.notFound'));
  const subjects = await subjectService.getSemesterStudents(req.params.semesterId);
  if (subjects.length > 0) throw new ApiError(httpStatus.NOT_ACCEPTABLE, i18n.__('semester.delete.subjectsExist'));
  await semesterService.deleteSemester(semester);
  return res.status(httpStatus.NO_CONTENT).send();
});

const getSemesters = catchAsync(async (req, res) => {
  if (req.query?.year) {
    const year = await educationalYearService.getEducationalYearByValue(req.query.year);
    if (!year) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('semester.get.yearNotFound'));
    const semesters = await semesterService.getYearSemesters(year.id);
    return res.status(httpStatus.OK).send(semesters);
  }
  const semesters = await semesterService.getAllSemesters();
  return res.status(httpStatus.OK).send(semesters);
});

module.exports = {
  getSemester,
  getSemesters,
  deleteSemester,
  createSemester,
};
