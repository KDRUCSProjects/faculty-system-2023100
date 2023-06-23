const Joi = require('joi');

const createSubject = {
  body: Joi.object().keys({
    name: Joi.string().required(),
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
    subjectId: Joi.number().required()
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    semesterId: Joi.number(),
    teacherId: Joi.number(),
  }).min(1),
};

const assignSubjectToTeacher = {
  body: Joi.object().keys({
    subjectId: Joi.number().required(),
    teacherId: Joi.number().required(),
  })
}

module.exports = {
  createSubject,
  getSubject,
  getSemesterStudents,
  getTeacherSubjects,
  updatedSubject,
  assignSubjectToTeacher,
};
