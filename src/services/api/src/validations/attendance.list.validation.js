const Joi = require('joi');

const createAttendance = {
  body: Joi.object().keys({
    subjectFK: Joi.number().required(),
    studentFK: Joi.number().required(),
    isPresent: Joi.boolean().required(),
    date: Joi.date().required(),
  }),
};

const getAttendance = {
  params: Joi.object().keys({
    shokaId: Joi.number().required(),
  }),
};

module.exports = {
  createAttendance,
  getAttendance,
};
