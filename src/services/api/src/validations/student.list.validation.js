const Joi = require('joi');

const createStudentList = {
  body: Joi.object().keys({
    studentId: Joi.number().required(),
    semesterId: Joi.number().required(),
  }),
};

module.exports = {
  createStudentList,
};
