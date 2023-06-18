const Joi = require('joi');

const createDepartment = {
  body: Joi.object().keys({
    name: Joi.string().required('Department name is required'),
  }),
};

const getDepartment = {
  params: Joi.object().keys({
    departmentId: Joi.number().required('Department id is required'),
  }),
};

const updateDepartment = {
  params: Joi.object().keys({
    departmentId: Joi.number().required('Department id is required'),
  }),
  body: Joi.object().keys({
    name: Joi.string().required('Department name is required'),
  }),
};

module.exports = {
  getDepartment,
  createDepartment,
  updateDepartment,
};
