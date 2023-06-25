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
module.exports = {
  getStudentList,
  createStudentList,
};
