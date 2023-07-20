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

const deleteTaajil = {
  params: Joi.object().keys({
    studentId: Joi.number().required('Student Id is required'),
  }),
};

const getTaajil = {
  params: Joi.object().keys({
    taajilId: Joi.number().required(),
  }),
};

const updateTaajil = {
  params: Joi.object().keys({
    taajilId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      studentId: Joi.number(),
      educationalYear: Joi.number(),
      regNumber: Joi.number(),
      attachment: Joi.string(),
      notes: Joi.string(),
    })
    .min(1),
};

module.exports = {
  getTaajil,
  createTaajil,
  updateTaajil,
  deleteTaajil,
};
