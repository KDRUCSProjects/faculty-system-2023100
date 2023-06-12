const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
    studentService,
    studentListService,
    attendanceService,
    subjectService,
    semesterService,
    attendanceListService
} = require('../services');
const ApiError = require('../utils/ApiError');

const createAttendance = catchAsync(async (req, res) => {
    let results = [];
    let messages = [];
    for await (const std of req.body) {
        const { studentId, attendanceId } = std;
        const isStudentHasAttendance = await attendanceListService.findAttendanceByDateAndStudentId(studentId, attendanceId);
        if (isStudentHasAttendance) {
            messages.push({ student: std, message: 'student has attendance' });
            continue;
        }
        const student = await studentService.getStudent(studentId);
        if (!student) {
            messages.push({ student: std, message: 'Student Not Found' });
            continue
        }
        const listStudent = await studentListService.findListedStudentByStudentId(studentId);
        if (!listStudent) {
            messages.push({ record: std, message: 'students needs to be added to this semester' });
            continue;
        }
        const attendance = await attendanceService.getAttendance(attendanceId);
        if (!attendance) {
            messages.push({ student: std, message: 'attendance not found' });
            continue;
        }
        const subject = await subjectService.getSubject(attendance.subjectId);
        const semester = await semesterService.findSemesterById(subject.semesterId);
        if (semester.id === listStudent?.semesterId) {
            results.push(std);
            continue;
        } else {
            messages.push({ student: std, message: 'student is not in this semester' });
            continue;
        }
    }
    const attendance = await attendanceListService.createAttendance(results);
    return res.status(httpStatus.ACCEPTED).send({ results: attendance, messages });
});

const getAttendance = catchAsync(async (req, res) => {
    const results = await attendanceListService.getAttendance()
    return res.status(200).send(results);
});

module.exports = {
    getAttendance,
    createAttendance,
};
