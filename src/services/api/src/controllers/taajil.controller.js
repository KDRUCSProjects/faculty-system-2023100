const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { taajilService } = require('../services');

const createTaajil = catchAsync(async (req, res) => {
  const taajil = await taajilService.createTaajil(req.body);
  res.status(httpStatus.CREATED).send(taajil);
});

module.exports = {
  createTaajil,
};
