const Joi = require('joi');

const createTaajil = {
  body: Joi.object().keys({
    studentId: Joi.number().required('Student id is required'),
    educationalYear: Joi.number().required('Educational year is required'),
    regNumber: Joi.number().required('Registration number of Taajil form is required'),
    attachment: Joi.string(),
    notes: Joi.string(),
  }),
};

const studentsWithTaajil = {
  query: Joi.object().keys({
    educationalYear: Joi.number(),
  }),
};

const deleteTaajil = {
  params: Joi.object().keys({
    studentId: Joi.number().required('Student Id is required'),
  }),
};

module.exports = {
  createTaajil,
  studentsWithTaajil,
  deleteTaajil,
};
