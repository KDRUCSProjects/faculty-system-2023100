const Joi = require('joi');

const createSemester = {
  body: Joi.object().keys({
    title: Joi.number().required().valid(1, 2, 3, 4, 5, 6, 7, 8),
    educationalYearId: Joi.number().required(),
  }),
};

const updateSemester = {
  params: Joi.object().keys({
    semesterId: Joi.number().positive().required(),
  }),
  body: Joi.object().keys({
    totalWeeks: Joi.number().positive().required(),
    monthStart: Joi.number().required(),
    monthEnd: Joi.number().required(),
    attendancePercentage: Joi.number().positive().required(),
  }),
};

const getSemester = {
  params: Joi.object().keys({
    semesterId: Joi.number().required(),
  }),
};

const getSemesters = {
  query: Joi.object().keys({
    year: Joi.number(),
    statistics: Joi.boolean(),
  }),
};
module.exports = {
  getSemester,
  getSemesters,
  createSemester,
  updateSemester,
};
