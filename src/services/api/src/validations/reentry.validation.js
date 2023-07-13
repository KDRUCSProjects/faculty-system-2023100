const Joi = require('joi');

const createReentry = {
  body: Joi.object().keys({
    studentId: Joi.number().required('Student id is required'),
    educationalYear: Joi.number().required('Educational year is required'),
    regNumber: Joi.number().required('Registration number of Reentry form is required'),
    attachment: Joi.string(),
    notes: Joi.string(),
    reason: Joi.string().required().valid('Taajil', 'Mahrom', 'Special Taajil', 'Repeat'),
  }),
};

const studentsWithReentry = {
  query: Joi.object().keys({
    educationalYear: Joi.number(),
  }),
};

const deleteReentry = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

const updateReentry = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      studentId: Joi.number(),
      educationalYear: Joi.number(),
      regNumber: Joi.number(),
      attachment: Joi.string(),
      notes: Joi.string(),
      reason: Joi.string().valid('Taajil', 'Mahrom', 'Special Taajil', 'Repeat'),
    })
    .min(1),
};

module.exports = {
  createReentry,
  deleteReentry,
  updateReentry,
  studentsWithReentry,
};
