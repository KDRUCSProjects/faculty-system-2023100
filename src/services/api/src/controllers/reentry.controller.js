const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { reentryService } = require('../services');

const createReentry = catchAsync(async (req, res) => {
  const reentry = await reentryService.createReentry(req.body);
  res.status(httpStatus.CREATED).send(reentry);
});

const reentryStudents = catchAsync(async (req, res) => {
  const studentsWithReentry = await reentryService.reentryStudents(req.query);
  res.status(httpStatus.OK).send(studentsWithReentry);
});

const deleteReentry = catchAsync(async (req, res) => {
  let theStudent = await reentryService.deleteReentry(req.params.id);

  res.status(httpStatus.OK).send(theStudent);
});

module.exports = {
  createReentry,
  reentryStudents,
  deleteReentry,
};
