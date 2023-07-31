const Joi = require('joi');

const createMonfaqi = {
  body: Joi.object().keys({
    studentId: Joi.number().required(),
    year: Joi.number().required(),
    regNumber: Joi.number().required(),
    attachment: Joi.string(),
    notes: Joi.string(),
  }),
};

const getMonfaqi = {
  params: Joi.object().keys({
    monfaqiId: Joi.number(),
  }),
};

const updateMonfaqi = {
  params: Joi.object().keys({
    monfaqiId: Joi.number().required(),
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
