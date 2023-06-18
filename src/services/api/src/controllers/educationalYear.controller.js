const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { educationalYearService, semesterService } = require('../services');
const ApiError = require('../utils/ApiError');

const createEducationalYear = catchAsync(async (req, res) => {
  const year = await educationalYearService.findEducationalYearByValue(req.body.educationalYear);
  if (year) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Year already created');
  const results = await educationalYearService.createEducationalYear(req.body.educationalYear);
  res.status(httpStatus.CREATED).send(results);
});

const getEducationalYears = catchAsync(async (req, res) => {
  const results = await educationalYearService.getEducationalYears();
  res.status(httpStatus.OK).send(results);
});

const deleteEducationalYear = catchAsync(async (req, res) => {
  const year = await educationalYearService.getEducationalYear(req.params.yearId);
  if (!year) throw new ApiError(httpStatus.NOT_FOUND, 'year not found');
  await educationalYearService.deleteEducationalYear(year);
  res.status(httpStatus.NO_CONTENT).send();
});

const getEducationalYear = catchAsync(async (req, res) => {
  const year = await educationalYearService.getEducationalYear(req.params.yearId);
  if (!year) throw new ApiError(httpStatus.NOT_FOUND, 'year not found');
  res.status(httpStatus.OK).send(year);
});

module.exports = {
  getEducationalYears,
  getEducationalYear,
  deleteEducationalYear,
  createEducationalYear,
};
