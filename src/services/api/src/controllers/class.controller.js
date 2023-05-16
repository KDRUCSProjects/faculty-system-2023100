const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { classService, semesterService } = require('../services');
const ApiError = require('../utils/ApiError');

const createClass = catchAsync(async (req, res) => {
  const classBody = await classService.findClass(req.body);
  if (classBody) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'class already created');
  const results = await classService.createClass(req.body);
  await semesterService.createFirstSemester(results.id);
  await semesterService.createSecondSemester(results.id);
  res.status(httpStatus.CREATED).send({ results });
});

const getClass = catchAsync(async (req, res) => {
  const classBody = await classService.getClassById(req.params.classId);
  if (!classBody) throw new ApiError(httpStatus.NOT_FOUND, 'Class Not Found');
  res.status(httpStatus.OK).send({ classBody });
});

const deleteClass = catchAsync(async (req, res) => {
  const classBody = await classService.findClass({ id: req.params.classId });
  if (!classBody) throw new ApiError(httpStatus.NOT_FOUND, 'class not found');
  await classService.deleteClass(classBody);
  res.status(httpStatus.NO_CONTENT).send();
});

const getClasses = catchAsync(async (req, res) => {
  const classes = await classService.getClasses();
  res.status(httpStatus.OK).send({ classes });
});

module.exports = {
  getClass,
  getClasses,
  deleteClass,
  createClass,
};
