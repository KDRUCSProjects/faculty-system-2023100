const Joi = require('joi');

const createTaajil = {
  body: Joi.object().keys({
    studentId: Joi.number().required('Student id is required'),
    educationalYear: Joi.number().required('Educational year is required'),
    regNumber: Joi.number(),
    attachment: Joi.string(),
    notes: Joi.string(),
  }),
};

module.exports = {
  createTaajil,
};
