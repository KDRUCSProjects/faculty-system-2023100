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
    const { studentFK, subjectFK, date } = req.body;
    const isStudentHasAttendance = await attendanceListService.findAttendanceByDateAndStudentId(studentFK, subjectFK, date);
    if (isStudentHasAttendance) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'student has attendance');
    const student = await studentService.getStudent(studentFK);
    if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'Student Not Found');
    const listStudent = await studentListService.findListedStudentByStudentId(studentFK);
    if (!listStudent) throw new ApiError(httpStatus.NOT_FOUND, 'student needs to be added to a semester');
    const attendance = await attendanceService.findAttendanceBySubjectId(subjectFK);
    if (!attendance) throw new ApiError(httpStatus.NOT_FOUND, 'attendance not found');
    const subject = await subjectService.getSubject(attendance.subjectId);
    const semester = await semesterService.findSemesterById(subject.semesterId);
    if (semester.id === listStudent?.semesterId) {
        const attendance = await attendanceListService.createAttendance(req.body);
        return res.status(httpStatus.CREATED).send(attendance);
    } else {
        throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Student does not exists in this semester');
    }
});

const getAttendance = catchAsync(async (req, res) => {

});

module.exports = {
    getAttendance,
    createAttendance,
};
