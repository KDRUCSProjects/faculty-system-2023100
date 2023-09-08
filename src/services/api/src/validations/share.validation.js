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
    studentId: Joi.number(),
    taajilId: Joi.number(),
    reentryId: Joi.number(),
    kankorId: Joi.string(),
    educationalYear: Joi.number(),
    limit: Joi.number(),
    page: Joi.number(),
  }),
};

module.exports = {
  paginate,
  studentsWithTaajilReentryAndTabdili,
};
