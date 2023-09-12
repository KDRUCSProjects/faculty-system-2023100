const Joi = require('joi');

const createSubject = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    credit: Joi.number().required().min(1).max(6).message('credit must be between 1 and 6'),
    codeNumber: Joi.string(),
    semesterId: Joi.number().required(),
    teacherId: Joi.number(),
  }),
};

const getSubject = {
  params: Joi.object().keys({
    subjectId: Joi.number().positive().integer().required(),
  }),
};

const createReport = {
  params: Joi.object().keys({
    subjectId: Joi.number().positive().integer().required(),
  }),
  query: Joi.object().keys({
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required(),
  }),
};

const getTeacherSubjects = {
  params: Joi.object().keys({
    teacherId: Joi.number().required().positive().integer(),
  }),
  query: Joi.object().keys({
    year: Joi.number().integer(),
    all: Joi.number().integer(),
  }),
};

const getSemesterStudents = {
  params: Joi.object().keys({
    subjectId: Joi.number().positive().integer().required(),
  }),
};

const updatedSubject = {
  params: Joi.object().keys({
    subjectId: Joi.number().positive().integer().required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      credit: Joi.number().min(1).max(6).message('credit must be between 1 and 6'),
      codeNumber: Joi.string(),
      semesterId: Joi.number(),
      teacherId: Joi.number(),
    })
    .min(1),
};

const assignSubjectToTeacher = {
  body: Joi.object().keys({
    subjectId: Joi.number().positive().integer().required(),
    teacherId: Joi.number().required().positive().integer(),
  }),
};

const getSubjects = {
  query: Joi.object().keys({
    semesterId: Joi.number().positive().integer(),
    status: Joi.string().valid('unassigned'),
  }),
};

module.exports = {
  createReport,
  createSubject,
  getSubject,
  getSubjects,
  getSemesterStudents,
  getTeacherSubjects,
  updatedSubject,
  assignSubjectToTeacher,
};
