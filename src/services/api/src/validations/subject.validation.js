const Joi = require('joi');

const createSubject = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    semesterId: Joi.number().required(),
    teacherId: Joi.number().required(),
  }),
};

const getSubject = {
  params: Joi.object().keys({
    subjectId: Joi.number().required(),
  }),
};

module.exports = {
  createSubject,
  getSubject,
};
