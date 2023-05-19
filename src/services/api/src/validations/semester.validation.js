const Joi = require('joi');

const createSemester = {
  body: Joi.object().keys({
    title: Joi.number().required().valid(1, 2, 3, 4, 5, 6, 7, 8),
    educationalYearId: Joi.number().required(),
  }),
};

const getSemester = {
  params: Joi.object().keys({
    semesterId: Joi.number().required(),
  }),
};

module.exports = {
  createSemester,
  getSemester,
};
