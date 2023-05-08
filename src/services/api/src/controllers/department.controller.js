const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { departmentService } = require('../services');

const createDepartment = catchAsync(async (req, res) => {
  const user = await departmentService.createDepartment(req.body);
  res.status(httpStatus.CREATED).send(user);
});

module.exports = {
  createDepartment,
};
