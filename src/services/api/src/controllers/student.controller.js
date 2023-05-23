const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { studentService, educationalYearService } = require('../services');
const ApiError = require('../utils/ApiError');

const registerStudent = catchAsync(async (req, res) => {
  const year = await educationalYearService.getEducationalYear(req.body.educationalYearId);
  if (!year) throw new ApiError(httpStatus.NOT_FOUND, 'Educational Year Not Found');
  if (req.file) {
    req.body.imageUrl = req.file.path;
  }
  const student = await studentService.getStudentOnKankorId(req.body.kankorId);
  if (student) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Student already created on this Kankor Id');
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

const getStudentOnKankorId = catchAsync(async (req, res) => {
  const student = await studentService.getStudentOnKankorId(req.params.kankorId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'Student Not Found');
  res.status(httpStatus.OK).send({ student });
});

module.exports = {
  getStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  registerStudent,
  getStudentOnKankorId,
};
