const Joi = require('joi');

const createReentry = {
  body: Joi.object().keys({
    studentId: Joi.number().required('Student id is required'),
    educationalYear: Joi.number().required('Educational year is required'),
    regNumber: Joi.number().required('Registration number of Reentry form is required'),
    attachment: Joi.string(),
    notes: Joi.string(),
  }),
};

module.exports = {
  createReentry,
};
