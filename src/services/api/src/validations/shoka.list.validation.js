const Joi = require('joi');

const createShokaList = {
  body: Joi.object().keys({
    shokaId: Joi.number().required(),
    studentId: Joi.number().required(),
    midtermMarks: Joi.number().required().min(0).max(20),
    assignmentOrProjectMarks: Joi.number().required().min(0).max(20),
    finalMarks: Joi.number().required().min(0).max(60),
  }),
};

const getShokaList = {
  params: Joi.object().keys({
    shokaId: Joi.number().required(),
  }),
};

module.exports = {
  createShokaList,
  getShokaList,
};
