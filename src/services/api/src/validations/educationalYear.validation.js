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
const setDate = {
  params: Joi.object().keys({
    yearId: Joi.number().required(),
  }),
  body: Joi.object().keys({
    firstHalfStart: Joi.number().integer().positive(),
    firstHalfEnd: Joi.number().integer().positive(),
    SecondHalfStart: Joi.number().integer().positive(),
    SecondHalfEnd: Joi.number().integer().positive(),
    period: Joi.number().integer().positive(),
  }).min(1),
};

const getEducationalYears = {
  query: Joi.object().keys({
    currentYear: Joi.boolean().valid(true),
    period: Joi.number().integer().positive(),
  }),
};

const getYearByValue = {
  body: Joi.object().keys({
    year: Joi.number().integer().required(),
  }),
};

const setCurrentYear = {
  body: Joi.object()
    .keys({
      year: Joi.number().integer().required(),
      firstHalf: Joi.boolean().valid(true),
      secondHalf: Joi.boolean().valid(true),
    })
    .max(2)
    .min(2),
};

module.exports = {
  setDate,
  setCurrentYear,
  getYearByValue,
  getEducationalYear,
  getEducationalYears,
  createEducationalYear,
};
