const Joi = require('joi');

const createFile = {
  params: Joi.object().keys({
    period: Joi.number().positive().integer().required(),
  }),
};

module.exports = {
  createFile,
};
