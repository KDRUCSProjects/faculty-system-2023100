const Joi = require('joi');

const createSubject = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    credit: Joi.number().required().min(1).max(4).message('credit must be between 1 and 4'),
    semesterId: Joi.number().required(),
    teacherId: Joi.number(),
  }),
};

const getSubject = {
  params: Joi.object().keys({
    subjectId: Joi.number().required(),
  }),
};

const getTeacherSubjects = {
  params: Joi.object().keys({
    teacherId: Joi.number().required(),
  }),
};

const getSemesterStudents = {
  params: Joi.object().keys({
    subjectId: Joi.number().required(),
  }),
};

const updatedSubject = {
  params: Joi.object().keys({
    subjectId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      credit: Joi.number().min(1).max(4).message('credit must be between 1 and 4'),
      semesterId: Joi.number(),
      teacherId: Joi.number(),
    })
    .min(1),
};

const assignSubjectToTeacher = {
  body: Joi.object().keys({
    subjectId: Joi.number().required(),
    teacherId: Joi.number().required(),
  }),
};

const getSubjects = {
  query: Joi.object().keys({
    semesterId: Joi.number(),
    status: Joi.string().valid('unassigned'),
  }),
};

module.exports = {
  createSubject,
  getSubject,
  getSubjects,
  getSemesterStudents,
  getTeacherSubjects,
  updatedSubject,
  assignSubjectToTeacher,
};
