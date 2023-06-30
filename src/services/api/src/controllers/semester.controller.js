const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { semesterService, educationalYearService } = require('../services');
const ApiError = require('../utils/ApiError');

const createSemester = catchAsync(async (req, res) => {
  const year = await educationalYearService.getEducationalYear(req.body.educationalYearId);
  if (!year) throw new ApiError(httpStatus.NOT_FOUND, 'Educational Year Not found with this ID');
  const semester = await semesterService.findSemester(req.body);
  if (semester) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Semester is already created');
  const results = await semesterService.createNewSemester(req.body);
  res.status(httpStatus.CREATED).send(results);
});

const getSemester = catchAsync(async (req, res) => {
  const semester = await semesterService.findSemesterById(req.params.semesterId);
  if (!semester) throw new ApiError(httpStatus.NOT_FOUND, 'Semester Not Found');
  res.status(httpStatus.OK).send(semester);
});

const deleteSemester = catchAsync(async (req, res) => {
  const semester = await semesterService.findSemesterById(req.params.semesterId);
  if (!semester) throw new ApiError(httpStatus.NOT_FOUND, 'semester not found');
  await semesterService.deleteSemester(semester);
  res.status(httpStatus.NO_CONTENT).send();
});

const getSemesters = catchAsync(async (req, res) => {
  if (req.query?.year) {
    const year = await educationalYearService.getEducationalYearByValue(req.query.year);
    if (!year) throw new ApiError(httpStatus.NOT_FOUND, 'year not found');
    const semesters = await semesterService.getYearSemesters(year.id);
    return res.status(httpStatus.OK).send(semesters);
  }
  const semesters = await semesterService.getAllSemesters();
  res.status(httpStatus.OK).send(semesters);
});



module.exports = {
  getSemester,
  getSemesters,
  deleteSemester,
  createSemester,
};
