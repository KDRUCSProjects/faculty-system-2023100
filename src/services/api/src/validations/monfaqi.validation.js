const Joi = require('joi');

const createMonfaqi = {
  body: Joi.object().keys({
    studentId: Joi.number().required(),
    educationalYear: Joi.number().required(),
    regNumber: Joi.number().required(),
    attachment: Joi.string(),
    notes: Joi.string(),
  }),
};

const getMonfaqi = {
  params: Joi.object().keys({
    monfaqiId: Joi.number().positive().integer(),
  }),
};

const updateMonfaqi = {
  params: Joi.object().keys({
    monfaqiId: Joi.number().required().positive().integer(),
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
  getMonfaqi,
  createMonfaqi,
  updateMonfaqi,
};
