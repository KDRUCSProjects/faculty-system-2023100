// Sequelize Models
const { Op, QueryTypes } = require('sequelize');
const moment = require('moment');
const httpStatus = require('http-status');
const { AttendanceList, sequelize } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * create attendance
 * @param {Object} attendanceBody
 * @returns {Promise<AttendanceList>}
 */
const createAttendance = (attendanceBody) => {
  return AttendanceList.bulkCreate(attendanceBody);
};

/**
 * update todays attendance
 * @param {Object} oldAttendance
 * @param {Object} newAttendance
 * @returns {Promise<AttendanceList>}
 */
const updateTodaysAttendance = (oldAttendance, newAttendance) => {
  if (oldAttendance instanceof AttendanceList) {
    oldAttendance.set({
      ...oldAttendance,
      ...newAttendance,
    });
    return oldAttendance.save();
  }
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong please try again');
};

/**
 * take todays attendance
 * @param {Object} attendanceBody
 * @returns {Promise<AttendanceList>}
 */
const takeTodaysAttendance = (attendanceBody) => {
  return AttendanceList.create(attendanceBody);
};

/**
 * find all attendance
 * @param {Object} attendanceBody
 * @returns {Promise<AttendanceList>}
 */
const getAttendance = () => {
  return AttendanceList.findAll();
};

/**
 * get semester students and attendance
 * @param {ObjectId} attendanceId
 * @returns {Promise<AttendanceList>}
 */
const getSemesterSdtAndAttendance = (attendanceId) => {
  return sequelize.query(
    `
    select DISTINCT
    subject.id as subjectId,
    subject.name as subjectName,
    user.id as teacherId,
    user.name as teacherName,
    student.id as studentId,
    student.fullName as studentName,
    student.nickName as nickName,
    student.fatherName as fatherName,
    student.kankorId as kankorId,
    student.grandFatherName as grandFatherName,
    attendanceList.date as date,
    attendanceList.shamsiDate as shamsiDate,
    attendanceList.isPresentOne as isPresentOne,
    attendanceList.isPresentTwo as isPresentTwo
    from attendancelists as attendancelist
    inner join attendances as attendance on attendance.id = attendancelist.attendanceId
    inner join subjects as subject on subject.id = attendance.subjectId
    inner join users as user on user.id = subject.teacherId
    inner join students as student on student.id = attendancelist.studentId
    where attendancelist.attendanceId = ${attendanceId} 
    AND DATE(attendancelist.date) = CURDATE();
    `,
    { type: QueryTypes.SELECT }
  );
};

/**
 * get attendance by date attendance id and student Id
 * @param {ObjectId} studentId
 * @param {ObjectId} attendanceFK
 * @returns {Promise<AttendanceList>}
 */
const findStudentFirstCellAttendance = (studentId, attendanceId) => {
  const startOfDay = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
  const endOfDay = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');

  return AttendanceList.findOne({
    where: {
      studentId,
      attendanceId,
      date: {
        [Op.gt]: startOfDay,
        [Op.lt]: endOfDay,
      },
    },
  });
};

module.exports = {
  getAttendance,
  createAttendance,
  updateTodaysAttendance,
  takeTodaysAttendance,
  getSemesterSdtAndAttendance,
  findStudentFirstCellAttendance,
};
