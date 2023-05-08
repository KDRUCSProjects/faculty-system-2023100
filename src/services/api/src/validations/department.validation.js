const Joi = require('joi');

const createDepartment = {
  body: Joi.object().keys({
    name: Joi.string().required('Department name is required'),
  }),
};

module.exports = {
  createDepartment,
};
