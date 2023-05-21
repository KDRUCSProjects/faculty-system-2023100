const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { reentryService } = require('../services');

const createReentry = catchAsync(async (req, res) => {
  const reentry = await reentryService.createReentry(req.body);
  res.status(httpStatus.CREATED).send(reentry);
});

module.exports = {
  createReentry,
};
