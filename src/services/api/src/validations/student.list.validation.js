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
    year: Joi.number(),
    semester: Joi.number().min(1).max(8),
    class: Joi.number().min(1).max(4),
    page: Joi.number(),
    limit: Joi.number(),
  }),
};
module.exports = {
  getStudentList,
  getStudentLists,
  createStudentList,
};
