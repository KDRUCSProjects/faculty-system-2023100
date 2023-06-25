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

const getStudentLists = catchAsync(async (req, res) => {
  const studentList = await studentListService.getStudentLists();
  return res.status(httpStatus.OK).send(studentList);
});

const deleteStudentList = catchAsync(async (req, res) => {
  const studentList = await studentListService.findStudentListById(req.params.studentListId);
  if (!studentList) throw new ApiError(httpStatus.NOT_FOUND, 'student list not found');
  await studentListService.deleteStudentList(studentList);
  return res.status(httpStatus.NO_CONTENT).send();
});

const deleteBunch = catchAsync(async (req, res) => {
  const results = [];
  for await (const studentListId of req.body) {
    const studentList = await studentListService.findStudentListById(studentListId);
    if (studentList) {
      const result = await studentListService.deleteStudentList(studentList);
      results.push(result);
    }
  }
  return res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  deleteBunch,
  getStudentLists,
  deleteStudentList,
  createStudentList,
};
