const Joi = require('joi');

const createConversionReport = {
  query: Joi.object().keys({
    semesterId: Joi.number().required(),
    type: Joi.string().valid('taajil', 'reentry', 'present', 'monfaq', 'tabdili', 'total'),
  }),
};

module.exports = {
  createConversionReport,
};
