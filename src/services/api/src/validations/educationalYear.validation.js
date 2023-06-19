const Joi = require('joi');

const createEducationalYear = {
  body: Joi.object().keys({
    educationalYear: Joi.number().required(),
  }),
};

const getEducationalYear = {
  params: Joi.object().keys({
    yearId: Joi.number().required(),
  }),
};

const getYearByValue = {
  params: Joi.object().keys({
    year: Joi.number().required(),
  }),
};

module.exports = {
  getYearByValue,
  createEducationalYear,
  getEducationalYear,
};
