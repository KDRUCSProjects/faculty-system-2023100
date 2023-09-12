const Joi = require('joi');

const createStudentList = {
  body: Joi.object().keys({
    studentId: Joi.number().required().positive().integer(),
    semesterId: Joi.number().required().positive().integer(),
  }),
};

const getStudentList = {
  params: Joi.object().keys({
    studentListId: Joi.number().required().positive().integer(),
  }),
};

const getStudentLists = {
  query: Joi.object().keys({
    semesterId: Joi.number(),
    year: Joi.number(),
    semester: Joi.number().min(1).max(8),
    class: Joi.number().min(1).max(4),
    page: Joi.number(),
    limit: Joi.number(),
  }),
};

const deleteBunch = {
  body: Joi.array()
    .items({
      studentId: Joi.number().integer().min(1).required(),
      semesterId: Joi.number().integer().min(1).required(),
    })
    .min(1),
};

const promoteStudents = {
  params: Joi.object().keys({
    semesterId: Joi.number().required('Semester Id is required').positive().integer(),
  }),
};

module.exports = {
  deleteBunch,
  getStudentList,
  promoteStudents,
  getStudentLists,
  createStudentList,
};
