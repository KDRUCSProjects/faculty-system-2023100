const Joi = require('joi');

const createTaajil = {
  body: Joi.object().keys({
    studentId: Joi.number().required('Student id is required'),
    educationalYear: Joi.number().required('Educational year is required'),
    regNumber: Joi.number().required('Registration number of Taajil form is required'),
    attachment: Joi.string(),
    notes: Joi.string(),
    type: Joi.string().required('Taajil type is required').valid('taajil', 'special_taajil'),
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
