// Sequelize Models
const httpStatus = require('http-status');
const { Attendance, AttendanceReport } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Attendance Report
 * @param {Object} attendanceBody
 * @returns {Promise<Attendance>}
 */
const createAttendanceReport = (attendanceBody) => {
  return AttendanceReport.create(attendanceBody);
};

/**
 * update a attendance report
 * @param {Object} oldAttendanceReport
 * @param {Object} newAttendanceReport
 * @returns {Promise<AttendanceReport>}
 */
const updateAttendanceReport = (oldAttendanceReport, newAttendanceReport) => {
  if (oldAttendanceReport instanceof AttendanceReport) {
    oldAttendanceReport.set({
      ...oldAttendanceReport,
      ...newAttendanceReport,
    });
    return oldAttendanceReport.save();
  }

  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
};

/**
 * get attendance report
 * @param {ObjectId} attendanceId
 * @returns {Promise<Attendance>}
 */
const getAttendanceReport = (body) => {
  return AttendanceReport.findOne({ where: body });
};

/**
 * Create a Attendance
 * @param {Object} attendanceBody
 * @returns {Promise<Attendance>}
 */
const createAttendance = (attendanceBody) => {
  return Attendance.create(attendanceBody);
};

/**
 * get an Attendance
 * @param {ObjectId} attendanceId
 * @returns {Promise<Attendance>}
 */
const getAttendance = (attendanceId) => {
  return Attendance.findOne({ where: { id: attendanceId } });
};

/**
 * get an Attendance by subjectId
 * @param {ObjectId} subjectId
 * @returns {Promise<Attendance>}
 */
const findAttendanceBySubjectId = (subjectId) => {
  return Attendance.findOne({ where: { subjectId } });
};

// /**
//  * get all Attendances
//  * @returns {Promise<Attendance>}
//  */
// const getAttendances = () => {
//   return Attendance.findAll({ order: [['createdAt', 'ASC']] });
// };

/**
 * delete Attendance
 * @param {Object} attendance
 * @returns {Promise<Attendance>}
 */
const deleteAttendance = (attendance) => {
  if (attendance instanceof Attendance) {
    return attendance.destroy();
  }
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong please try again');
};

module.exports = {
  getAttendance,
  // getAttendances,
  createAttendance,
  deleteAttendance,
  findAttendanceBySubjectId,
  createAttendanceReport,
  updateAttendanceReport,
  getAttendanceReport,
};
