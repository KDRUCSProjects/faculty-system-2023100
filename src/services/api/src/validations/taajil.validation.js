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

module.exports = {
  createTaajil,
};
