const Joi = require('joi');

const createTabdili = {
  body: Joi.object().keys({
    studentId: Joi.number().required(),
    educationalYear: Joi.number().required(),
    regNumber: Joi.number().required(),
    attachment: Joi.string(),
    notes: Joi.string(),
  }),
};

const getTabdili = {
  params: Joi.object().keys({
    tabdiliId: Joi.number(),
  }),
};

const updateTabdili = {
  params: Joi.object().keys({
    tabdiliId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      regNumber: Joi.number(),
      attachment: Joi.string(),
      notes: Joi.string(),
    })
    .min(1),
};

module.exports = {
  getTabdili,
  createTabdili,
  updateTabdili,
};
