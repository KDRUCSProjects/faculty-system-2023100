const Joi = require('joi');

const createShokaList = {
  query: Joi.object().keys({
    chance: Joi.number().integer().min(2).max(3),
  }),
  body: Joi.object().keys({
    subjectId: Joi.number().required().integer(),
    studentId: Joi.number().required().integer(),
    projectMarks: Joi.number().min(0),
    assignment: Joi.number().min(0),
    finalMarks: Joi.number().min(0),
    practicalWork: Joi.number().min(0),
  }),
};

const updateShokaList = {
  params: Joi.object().keys({
    shokalistId: Joi.number().integer().min(0).required(),
  }),
  body: Joi.object()
    .keys({
      projectMarks: Joi.number().min(0),
      assignment: Joi.number().min(0),
      finalMarks: Joi.number().min(0),
      practicalWork: Joi.number().min(0),
    })
    .min(1),
};

const getShokaList = {
  params: Joi.object().keys({
    subjectId: Joi.number().required().positive().integer(),
  }),
  query: Joi.object().keys({
    chance: Joi.number().min(1).max(3).required(),
  }),
};

const deleteShokaList = {
  params: Joi.object().keys({
    shokalistId: Joi.number().required().integer().positive(),
  }),
};

const getStudentMarks = {
  params: Joi.object().keys({
    studentId: Joi.number().required().integer().positive(),
  }),
  query: Joi.object().keys({
    semester: Joi.number().min(1).max(8),
    class: Joi.number().min(1).max(4),
    semesterId: Joi.number().min(1),
  }),
};

module.exports = {
  getShokaList,
  deleteShokaList,
  createShokaList,
  getStudentMarks,
  updateShokaList,
};
