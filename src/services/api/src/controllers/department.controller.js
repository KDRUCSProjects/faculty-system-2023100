const httpStatus = require('http-status');
const i18n = require('i18n');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { departmentService } = require('../services');

const createDepartment = catchAsync(async (req, res) => {
  const department = await departmentService.createDepartment(req.body);
  res.status(httpStatus.CREATED).send(department);
});

const getDepartment = catchAsync(async (req, res) => {
  const department = await departmentService.findById(req.params.departmentId);
  if (!department) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('departmentNotFound'));
  res.status(httpStatus.OK).send(department);
});

const getDepartments = catchAsync(async (req, res) => {
  const department = await departmentService.getDepartments();
  res.status(httpStatus.OK).send(department);
});

const updateDepartment = catchAsync(async (req, res) => {
  const department = await departmentService.findById(req.params.departmentId);
  if (!department) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('departmentNotFound'));
  const results = await departmentService.updateDepartment(department, req.body);
  res.status(httpStatus.CREATED).send(results);
});

const deleteDepartment = catchAsync(async (req, res) => {
  const department = await departmentService.findById(req.params.departmentId);
  if (!department) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('departmentNotFound'));
  await departmentService.deleteDepartment(department);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createDepartment,
  getDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
};
