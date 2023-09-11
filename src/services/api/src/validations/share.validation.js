const Joi = require('joi');

const paginate = {
  query: Joi.object().keys({
    page: Joi.number(),
    limit: Joi.number(),
    skip: Joi.number(),
    status: Joi.string().valid('taajils', 'reentry', 'tabdili', 'all'),
    kankorId: Joi.string(),
  }),
};

const studentsWithTaajilReentryAndTabdili = {
  query: Joi.object().keys({
    studentId: Joi.number().integer().positive(),
    taajilId: Joi.number().integer().positive(),
    tabdiliId: Joi.number().integer().positive(),
    monfaqiId: Joi.number().integer().positive(),
    reentryId: Joi.number().integer().positive(),
    kankorId: Joi.string(),
    educationalYear: Joi.number().integer().positive(),
    limit: Joi.number().integer().positive(),
    page: Joi.number().integer().positive(),
  }),
};

module.exports = {
  paginate,
  studentsWithTaajilReentryAndTabdili,
};
