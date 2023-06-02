const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { subjectService, shokaService, attendanceService, userService, semesterService } = require('../services');
const ApiError = require('../utils/ApiError');

const createSubject = catchAsync(async (req, res) => {
  const teacher = await userService.getUserById(req.body.teacherId);
  if (!teacher) throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  const semester = await semesterService.findSemesterById(req.body.semesterId);
  if (!semester) throw new ApiError(httpStatus.NOT_FOUND, 'semester not found');
  const results = await subjectService.createSubject(req.body);
  await shokaService.createShoka({ subjectId: results.id });
  await attendanceService.createAttendance({ subjectId: results.id });
  res.status(httpStatus.CREATED).send(results);
});

const getSubjects = catchAsync(async (req, res) => {
  const results = await subjectService.getSubjects();
  res.status(httpStatus.OK).send(results);
});

const deleteSubject = catchAsync(async (req, res) => {
  const subject = await subjectService.getSubject(req.params.subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
  await subjectService.deleteSubject(subject);
  res.status(httpStatus.NO_CONTENT).send();
});

const getSubject = catchAsync(async (req, res) => {
  const subject = await subjectService.getSubject(req.params.subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
  res.status(httpStatus.OK).send(subject);
});

module.exports = {
  getSubjects,
  getSubject,
  deleteSubject,
  createSubject,
};
