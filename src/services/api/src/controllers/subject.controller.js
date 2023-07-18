const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { subjectService, shokaService, attendanceService, userService, semesterService, educationalYearService } = require('../services');
const ApiError = require('../utils/ApiError');
const { subjectsFormatter } = require('../utils/marks.formatter');

const createSubject = catchAsync(async (req, res) => {
  if (req.body.teacherId) {
    const teacher = await userService.getTeacher(req.body.teacherId);
    if (!teacher) throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }
  const semester = await semesterService.findSemesterById(req.body.semesterId);
  if (!semester) throw new ApiError(httpStatus.NOT_FOUND, 'semester not found');
  const results = await subjectService.createSubject(req.body);
  await shokaService.createShoka({ subjectId: results.id });
  await attendanceService.createAttendance({ subjectId: results.id });
  res.status(httpStatus.CREATED).send(results);
});

const getSubjects = catchAsync(async (req, res) => {
  if (req.query?.status) {
    const unsignedSubjects = await subjectService.getUnassignedSubjects();
    return res.status(httpStatus.OK).send(unsignedSubjects);
  }
  if (req.query?.semesterId) {
    const semester = await semesterService.findSemesterById(req.query.semesterId);
    if (!semester) throw new ApiError(httpStatus.NOT_FOUND, 'semester not found');
    const semSubjects = await subjectService.getSemesterSubjects(semester.id);
    return res.status(httpStatus.OK).send(semSubjects);
  }
  const results = await subjectService.getSubjects();
  res.status(httpStatus.OK).send(results);
});

const deleteSubject = catchAsync(async (req, res) => {
  const subject = await subjectService.getSubjectById(req.params.subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
  const attendance = await attendanceService.findAttendanceBySubjectId(subject.id);
  if (attendance) await attendanceService.deleteAttendance(attendance);
  const shoka = await shokaService.findShokaBySubjectId(subject.id);
  if (shoka) await shokaService.deleteShoka(shoka);
  await subjectService.deleteSubject(req.user, subject);
  res.status(httpStatus.NO_CONTENT).send();
});

const getSubject = catchAsync(async (req, res) => {
  const subject = await subjectService.getSubject(req.params.subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
  res.status(httpStatus.OK).send(subject);
});

const getTeacherSubjects = catchAsync(async (req, res) => {
  const { teacherId } = req.params;
  if (req.query.year) {
    const year = await educationalYearService.getEducationalYearByValue(req.query.year);
    if (!year) throw new ApiError(httpStatus.NOT_FOUND, 'Year Not Found');
    const subjects = await subjectService.getTeacherSubjectsOfYear(teacherId, year.id);
    if (subjects.length <= 0) {
      return res.status(httpStatus.OK).send(subjects);
    }
    const results = subjectsFormatter(subjects);
    return res.status(httpStatus.OK).send(results);
  }
  const teacher = await userService.getTeacher(teacherId);
  if (!teacher) throw new ApiError(httpStatus.NOT_FOUND, 'teacher not found');
  const subjects = await subjectService.getTeacherSubjects(teacherId);
  return res.status(httpStatus.OK).send(subjects);
});

const getSemesterStudents = catchAsync(async (req, res) => {
  const { subjectId } = req.params;
  const subject = await subjectService.getSubject(subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
  const students = await subjectService.getSemesterStudents(subject.semesterId);
  return res.status(httpStatus.OK).send(students);
});

const updatedSubject = catchAsync(async (req, res) => {
  if (req.body.teacherId) {
    const teacher = await userService.getTeacher(req.body.teacherId);
    if (!teacher) throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }
  const subject = await subjectService.getSubjectById(req.params.subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
  const results = await subjectService.updatedSubject(subject, req.body);
  res.status(httpStatus.ACCEPTED).send(results);
});

const assignSubjectToTeacher = catchAsync(async (req, res) => {
  const subject = await subjectService.getSubjectById(req.body.subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
  const teacher = await userService.getTeacher(req.body.teacherId);
  if (!teacher) throw new ApiError(httpStatus.NOT_FOUND, 'Teacher Not Found');
  const results = await subjectService.updatedSubject(subject, { teacherId: req.body.teacherId });
  return res.status(httpStatus.ACCEPTED).send(results);
});

const takeBackSubjectFromTeacher = catchAsync(async (req, res) => {
  const subject = await subjectService.getSubjectById(req.body.subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
  if (subject.teacherId !== req.body.teacherId)
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'this subject is not related to this teacher');
  const results = await subjectService.updatedSubject(subject, { teacherId: null });
  return res.status(httpStatus.ACCEPTED).send(results);
});

module.exports = {
  getSubjects,
  getSubject,
  deleteSubject,
  createSubject,
  getSemesterStudents,
  getTeacherSubjects,
  updatedSubject,
  assignSubjectToTeacher,
  takeBackSubjectFromTeacher,
};
