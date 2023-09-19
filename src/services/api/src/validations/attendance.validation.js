const Joi = require('joi');

const getAttendance = {
  params: Joi.object().keys({
    subjectId: Joi.number().required(),
  }),
};

const createAttendanceReport = {
  params: Joi.object().keys({
    subjectId: Joi.number().required(),
  }),
  body: Joi.object().keys({
    studentId: Joi.number().required('Student Id is required'),
    subjectId: Joi.number().required('Subject Id is required'),
    month: Joi.number().required('Month number is required'),
    present: Joi.number(),
    absent: Joi.number(),
    attachment: Joi.string().allow(null),
  }),
};

const updateAttendanceReport = {
  params: Joi.object().keys({
    subjectId: Joi.number().required(),
  }),
  body: Joi.object().keys({
    id: Joi.number().required('Report id is required'),
    studentId: Joi.number().required('Student Id is required'),
    subjectId: Joi.number().required('Subject Id is required'),
    month: Joi.number().required('Month number is required'),
    present: Joi.number(),
    absent: Joi.number(),
    attachment: Joi.string().allow(null),
  }),
};

const getAttendanceReport = {
  params: Joi.object().keys({
    subjectId: Joi.number().required(),
  }),
  query: Joi.object().keys({
    month: Joi.number().required(),
  }),
};

const getAttendanceById = {
  params: Joi.object().keys({
    attendanceId: Joi.number().required(),
  }),
};

const createExcelFile = {
  params: Joi.object().keys({
    semesterId: Joi.number().required(),
  }),
  query: Joi.object().keys({
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required(),
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
  body: Joi.object().keys({
    studentId: Joi.number().integer().min(1).required(),
    status: Joi.boolean().required(),
  }),
};

module.exports = {
  getAttendance,
  createExcelFile,
  getAttendanceById,
  getTodaysAttendance,
  takeTodaysAttendance,
  takeOneStdAttendance,
  createAttendanceReport,
  updateAttendanceReport,
  getAttendanceReport,
};
