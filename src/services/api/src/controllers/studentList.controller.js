const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { studentService, semesterService, studentListService, taajilService, tabdiliService } = require('../services');
const ApiError = require('../utils/ApiError');

const createStudentList = catchAsync(async (req, res) => {
  const { studentId, semesterId } = req.body;
  const student = await studentService.getStudent(studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  const semester = await semesterService.findSemesterById(semesterId);
  if (!semester) throw new ApiError(httpStatus.NOT_FOUND, 'semester not found');
  const studentList = await studentListService.findListedStudentByStudentId(studentId);
  if (studentList) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'student already exists in a semester');
  const studentTajil = await taajilService.findTaajilByStudentId(studentId);
  if (studentTajil) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'student has tajil');
  const studentTabdili = await tabdiliService.findTabdiliByStudentId(studentId);
  if (studentTabdili) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'student has got tabdili');
  const result = await studentListService.createStudentList(req.body);
  return res.send(result);
});

const getStudentList = catchAsync(async (req, res) => {
  return res.send('get student list');
});

module.exports = {
  getStudentList,
  createStudentList,
};
