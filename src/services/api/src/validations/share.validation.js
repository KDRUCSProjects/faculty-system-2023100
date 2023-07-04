const Joi = require('joi');

const paginate = {
  query: Joi.object().keys({
    page: Joi.number(),
    limit: Joi.number(),
    skip: Joi.number(),
    status: Joi.string().valid('taajils', 'reentry', 'tabdili'),
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

const deleteBunch = {
  body: Joi.array().items(Joi.number().min(1)).min(1),
};

module.exports = {
  paginate,
  deleteBunch,
  studentsWithTaajilReentryAndTabdili,
};
