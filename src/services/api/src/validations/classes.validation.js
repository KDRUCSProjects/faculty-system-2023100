const Joi = require('joi');
const { checkClass } = require('./custom.validation');

const createClass = {
  body: Joi.object().keys({
    title: Joi.number().required().custom(checkClass),
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
