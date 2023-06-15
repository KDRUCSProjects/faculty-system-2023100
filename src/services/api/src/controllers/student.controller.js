const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { studentService, educationalYearService } = require('../services');
const ApiError = require('../utils/ApiError');

const registerStudent = catchAsync(async (req, res) => {
  const student = await studentService.getStudentOnKankorId(req.body.kankorId);
  if (student) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Student already created on this Kankor Id');
  const year = await educationalYearService.findEducationalYearByValue(req.body.educationalYear)
  let educationalYearId;
  if (year) {
    educationalYearId = year;
  } else {
    educationalYearId = (await educationalYearService.createEducationalYear(req.body.educationalYear))?.id;
  }
  if (req.file) {
    req.body.imageUrl = req.file.path.split('\\')[3];
  }
  const results = await studentService.registerStudent({
    ...req.body,
    educationalYearId,
  });
  res.status(httpStatus.CREATED).send(results);
});

const updateStudent = catchAsync(async (req, res) => {
  const student = await studentService.getStudent(req.params.studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'Student Not found');
  if (req.file) {
    req.body.imageUrl = req.file.path.split('\\')[3];
  }
  const results = await studentService.updateStudent(student, req.body);
  return res.status(httpStatus.ACCEPTED).send(results);
});

const getStudent = catchAsync(async (req, res) => {
  const student = await studentService.getStudent(req.params.studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'Student Not Found');
  res.status(httpStatus.OK).send(student);
});

const deleteStudent = catchAsync(async (req, res) => {
  const student = await studentService.getStudent(req.params.studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  await studentService.deleteStudent(student);
  res.status(httpStatus.NO_CONTENT).send();
});

const getStudents = catchAsync(async (req, res) => {
  const page = req.query?.page ? req.query?.page : 1;
  const offset = parseInt(((page - 1) * 10), 10);
  const { rows, count } = await studentService.getStudents(offset);
  res.status(httpStatus.OK).send({
    page: parseInt(page, 10),
    totalPages: Math.ceil(count / 10),
    total: count,
    results: rows
  });
});

const getStudentOnKankorId = catchAsync(async (req, res) => {
  const student = await studentService.getStudentOnKankorId(req.params.kankorId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'Student Not Found');
  res.status(httpStatus.OK).send(student);
});

const deleteStudents = catchAsync(async (req, res) => {
  let results = [];
  for await (const std of req.body) {
    const result = await studentService.deleteStudentById(std.studentId);
    results.push(result);
  }
  res.status(httpStatus.OK).send(results);
});



module.exports = {
  getStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  deleteStudents,
  registerStudent,
  getStudentOnKankorId,
};
