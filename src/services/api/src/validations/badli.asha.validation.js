const Joi = require('joi');

const createFile = {
  query: Joi.object().keys({
    year: Joi.number().positive().required().integer(),
    classTitle: Joi.number().positive().required().min(1).max(4),
  }),
};

module.exports = {
  createFile,
};
