const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { studentService } = require('../services');
const ApiError = require('../utils/ApiError');

const registerStudent = catchAsync(async (req, res) => {
  if (req.file) {
    req.body.imageUrl = req.file.path;
  }
  const results = await studentService.registerStudent(req.body);
  res.status(httpStatus.CREATED).send({ results });
});

const updateStudent = catchAsync(async (req, res) => {
  const student = await studentService.getStudent(req.params.studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'Student Not found');
  if (req.file) req.body.imageUrl = req.file.path;
  const results = await studentService.updateStudent(student, req.body);
  return res.status(httpStatus.ACCEPTED).send({ results });
});

const getStudent = catchAsync(async (req, res) => {
  const student = await studentService.getStudent(req.params.studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'Student Not Found');
  console.log(student);
  res.status(httpStatus.OK).send({ student });
});

const deleteStudent = catchAsync(async (req, res) => {
  const student = await studentService.getStudent(req.params.studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  await studentService.deleteStudent(student);
  res.status(httpStatus.NO_CONTENT).send();
});

const getStudents = catchAsync(async (req, res) => {
  const results = await studentService.getStudents();
  res.status(httpStatus.OK).send({ results });
});

module.exports = {
  getStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  registerStudent,
};
