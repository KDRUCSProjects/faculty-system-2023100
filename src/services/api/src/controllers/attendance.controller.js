const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { attendanceService, subjectService } = require('../services');
const ApiError = require('../utils/ApiError');

const getAttendances = catchAsync(async (req, res) => {
  const results = await attendanceService.getAttendances();
  return res.status(httpStatus.OK).send(results);
});

const getAttendance = catchAsync(async (req, res) => {
  const subject = await subjectService.getSubject(req.params.subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
  const attendance = await attendanceService.findAttendanceBySubjectId(req.params.subjectId);
  if (!attendance) throw new ApiError(httpStatus.NOT_FOUND, 'attendance not found');
  return res.status(httpStatus.OK).send(attendance);
});

const getAttendanceById = catchAsync(async (req, res) => {
  const attendance = await attendanceService.getAttendance(req.params.attendanceId);
  if (!attendance) throw new ApiError(httpStatus.NOT_FOUND, 'attendance not found');
  return res.status(httpStatus.OK).send(attendance);
});

module.exports = {
  getAttendance,
  getAttendances,
  getAttendanceById,
};
