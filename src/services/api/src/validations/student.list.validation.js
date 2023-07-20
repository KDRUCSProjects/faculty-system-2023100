const Joi = require('joi');

const createStudentList = {
  body: Joi.object().keys({
    studentId: Joi.number().required(),
    semesterId: Joi.number().required(),
  }),
};

const getStudentList = {
  params: Joi.object().keys({
    studentListId: Joi.number().required(),
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
  body: Joi.array().items(Joi.number().integer()).min(1),
};

module.exports = {
  deleteBunch,
  getStudentList,
  promoteStudents,
  getStudentLists,
  createStudentList,
};
