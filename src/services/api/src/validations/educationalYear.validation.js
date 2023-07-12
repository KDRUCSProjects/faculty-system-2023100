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

const getEducationalYears = {
  query: Joi.object().keys({
    currentYear: Joi.boolean().valid(true),
  }),
};


const getYearByValue = {
  body: Joi.object().keys({
    year: Joi.number().integer().required(),
  }),
};

const setCurrentYear = {
  body: Joi.object().keys({
    year: Joi.number().integer().required(),
    firstHalf: Joi.boolean().valid(true),
    secondHalf: Joi.boolean().valid(true),
  }).max(2).min(2),
};


module.exports = {
  setCurrentYear,
  getYearByValue,
  getEducationalYear,
  getEducationalYears,
  createEducationalYear,
};
