const httpStatus = require('http-status');
const i18n = require('i18n');
const catchAsync = require('../utils/catchAsync');
const {
  studentService,
  studentListService,
  attendanceService,
  subjectService,
  semesterService,
  attendanceListService,
} = require('../services');
const ApiError = require('../utils/ApiError');

const createAttendance = catchAsync(async (req, res) => {
  const results = [];
  const messages = [];
  for await (const std of req.body) {
    const { studentId, attendanceId } = std;
    const isStudentHasAttendance = await attendanceListService.findAttendanceByDateAndStudentId(studentId, attendanceId);
    if (isStudentHasAttendance) {
      messages.push({ student: std, message:  i18n.__('studentHasAttendance' )});
      continue;
    }
    const student = await studentService.getStudent(studentId);
    if (!student) {
      messages.push({ student: std, message:  i18n.__('studentNotFound') });
      continue;
    }
    const listStudent = await studentListService.findListedStudentByStudentId(studentId);
    if (!listStudent) {
      messages.push({ record: std, message:  i18n.__('studentsNeedsToAddToSemester') });
      continue;
    }
    const attendance = await attendanceService.getAttendance(attendanceId);
    if (!attendance) {
      messages.push({ student: std, message:  i18n.__('attendanceNotFound') });
      continue;
    }
    const subject = await subjectService.getSubject(attendance.subjectId);
    const semester = await semesterService.findSemesterById(subject.semesterId);
    if (semester.id === listStudent.semesterId) {
      results.push(std);
      continue;
    } else {
      messages.push({ student: std, message:  i18n.__('studentNotInSemester') });
      continue;
    }
  }
  const attendance = await attendanceListService.createAttendance(results);
  return res.status(httpStatus.ACCEPTED).send({ results: attendance, messages });
});

const getAttendance = catchAsync(async (req, res) => {
  const results = await attendanceListService.getAttendance();
  return res.status(200).send(results);
});

module.exports = {
  getAttendance,
  createAttendance,
};
