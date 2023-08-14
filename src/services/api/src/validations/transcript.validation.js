const Joi = require('joi');

const createFile = {
  params: Joi.object().keys({
    studentId: Joi.number().positive().integer().required(),
  }),
};

module.exports = {
  createFile,
};
