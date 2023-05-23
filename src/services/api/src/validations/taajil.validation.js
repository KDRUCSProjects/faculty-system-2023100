const Joi = require('joi');

const createtaajil = {
  body: Joi.object().keys({
    name: Joi.string().required('name is required'),
    student: Joi.string().required('student name is required'),
    term: Joi.string().required(' term is required'),
    startDate: Joi.string().required('start date   is required'),
    EndDate: Joi.string().required('enddate name is required'),
    year: Joi.string().required('taaji year  is required'),
  }),
};

module.exports = {
  createtaajil,
};
