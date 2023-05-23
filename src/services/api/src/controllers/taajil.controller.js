const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { taajilService } = require('../services');

const createTaajil = catchAsync(async (req, res) => {
  const taajil = await taajilService.createTaajil(req.body);
  res.status(httpStatus.CREATED).send(taajil);
});

const taajilStudents = catchAsync(async (req, res) => {
  const studentsWithTaajil = await taajilService.taajilStudents(req.query);
  res.status(httpStatus.OK).send(studentsWithTaajil);
});

const deleteTaajil = catchAsync(async (req, res) => {
  const theStudent = await taajilService.deleteTaajil(req.params.studentId);

  res.status(httpStatus.OK).send(theStudent);
});

module.exports = {
  createTaajil,
  taajilStudents,
  deleteTaajil,
};
