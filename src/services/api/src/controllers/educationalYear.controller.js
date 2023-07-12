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
  if (req.query?.currentYear) {
    const currentYear = await educationalYearService.getCurrentEducationalYear();
    return res.status(httpStatus.OK).send(currentYear);
  }
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

const getEducationalYearByValue = catchAsync(async (req, res) => {
  const year = await educationalYearService.getEducationalYearByValue(req.params.year);
  if (!year) throw new ApiError(httpStatus.NOT_FOUND, 'year not found');
  res.status(httpStatus.OK).send(year);
});

const setCurrentYear = catchAsync(async (req, res) => {
  const year = await educationalYearService.getEducationalYearByValue(req.body.year);
  if (!year) throw new ApiError(httpStatus.NOT_FOUND, 'year not found');
  const currentYear = await educationalYearService.getCurrentEducationalYear();
  if (currentYear && (currentYear?.year !== year.year)) {
    await educationalYearService.updateYear(currentYear, { onGoing: false });
  }
  if (req.body.firstHalf) {
    const results = await educationalYearService.updateYear(year, { onGoing: true, firstHalf: true, secondHalf: false });
    return res.status(httpStatus.ACCEPTED).send(results);
  }

  if (req.body.secondHalf) {
    const results = await educationalYearService.updateYear(year, { onGoing: true, secondHalf: true, firstHalf: false });
    return res.status(httpStatus.ACCEPTED).send(results);
  }
});


module.exports = {
  setCurrentYear,
  getEducationalYears,
  getEducationalYear,
  deleteEducationalYear,
  createEducationalYear,
  getEducationalYearByValue,
};
