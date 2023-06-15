const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { departmentService } = require('../services');

const createDepartment = catchAsync(async (req, res) => {
  const department = await departmentService.createDepartment(req.body);
  res.status(httpStatus.CREATED).send(department);
});

const getDepartment = catchAsync(async (req, res) => {
  const department = await departmentService.findById(req.params.departmentId);
  if (!department) throw new ApiError(httpStatus.NOT_FOUND, 'Department Not Found');
  res.status(httpStatus.OK).send(department);
});

const getDepartments = catchAsync(async (req, res) => {
  const department = await departmentService.getDepartments();
  res.status(httpStatus.OK).send(department);
});

const updateDepartment = catchAsync(async (req, res) => {
  const department = await departmentService.findById(req.params.departmentId);
  if (!department) throw new ApiError(httpStatus.NOT_FOUND, 'Department Not Found');
  const results = await departmentService.updateDepartment(department, req.body);
  res.status(httpStatus.CREATED).send(results);
});

const deleteDepartment = catchAsync(async (req, res) => {
  const department = await departmentService.findById(req.params.departmentId);
  if (!department) throw new ApiError(httpStatus.NOT_FOUND, 'Department Not Found');
  await departmentService.deleteDepartment(req.params.departmentId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createDepartment,
  getDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
};
