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

const getTodaysAttendance = {
  params: Joi.object().keys({
    subjectId: Joi.number().required().integer().min(1).messages({ 'number.min': 'subject id must by positive number' }),
  }),
};

const takeTodaysAttendance = {
  params: Joi.object().keys({
    subjectId: Joi.number().required().integer().min(1).messages({ 'number.min': 'subject id must by positive number' }),
  }),
  query: Joi.object().keys({
    type: Joi.string().required().valid('one', 'two', 'both'),
  }),
  body: Joi.object()
    .keys({
      students: Joi.array()
        .items({
          studentId: Joi.number()
            .integer()
            .min(1)
            .messages({ 'number.min': 'student id must be positive number' })
            .required(),
          status: Joi.boolean().required(),
        })
        .min(1),
    })
    .min(1),
};

const takeOneStdAttendance = {
  params: Joi.object().keys({
    subjectId: Joi.number().required().integer().min(1).messages({ 'number.min': 'subject id must by positive number' }),
  }),
  query: Joi.object().keys({
    type: Joi.string().required().valid('one', 'two', 'both'),
  }),
  body: Joi.object()
    .keys({
      studentId: Joi.number().integer().min(1).required(),
      status: Joi.boolean().required(),
    }),
};


module.exports = {
  getAttendance,
  getAttendanceById,
  getTodaysAttendance,
  takeTodaysAttendance,
  takeOneStdAttendance,
};
