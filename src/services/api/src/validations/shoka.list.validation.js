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

const getStudentMarks = {
  params: Joi.object().keys({
    studentId: Joi.number().required(),
  }),
  query: Joi.object().keys({
    semester: Joi.number().min(1).max(8),
    class: Joi.number().min(1).max(4),
  }),
};

module.exports = {
  getShokaList,
  createShokaList,
  getStudentMarks,
};
