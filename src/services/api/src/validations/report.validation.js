const Joi = require('joi');

const createConversionReport = {
  query: Joi.object().keys({
    semesterId: Joi.number(),
    type: Joi.number().valid('taajil', 'reentry', 'present'),
  }),
};

module.exports = {
  createConversionReport,
};
