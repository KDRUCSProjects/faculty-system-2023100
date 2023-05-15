const Joi = require('joi');

const createClass = {
  body: Joi.object().keys({
    title: Joi.number().required().valid(1, 2, 3, 4),
    educationalYearId: Joi.number().required(),
  }),
};

const getClass = {
  params: Joi.object().keys({
    classId: Joi.number().required(),
  }),
};

module.exports = {
  createClass,
  getClass,
};
