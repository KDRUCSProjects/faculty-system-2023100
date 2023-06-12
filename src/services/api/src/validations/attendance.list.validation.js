const Joi = require('joi');

const createAttendance = {
  body: Joi.array()
    .items({
      attendanceId: Joi.number().required(),
      studentId: Joi.number().required(),
      isPresent: Joi.boolean().required(),
    })
    .min(1),
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
