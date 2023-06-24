const Joi = require('joi');

const getAttendance = {
  params: Joi.object().keys({
    subjectId: Joi.number().required(),
  }),
};

const getAttendanceById = {
  params: Joi.object().keys({
    attendanceId: Joi.number().required(),
  }),
};
module.exports = {
  getAttendance,
  getAttendanceById,
};
