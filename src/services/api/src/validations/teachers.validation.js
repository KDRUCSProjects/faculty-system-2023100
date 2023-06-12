const Joi = require('joi');

const getTeacher = {
  params: Joi.object().keys({
    teacherId: Joi.number().required(),
  }),
};

module.exports = {
  getTeacher,
};
