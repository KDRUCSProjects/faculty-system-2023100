// Sequelize Models
const { Attendance } = require('../models');

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
  return Attendance.findById(attendanceId);
};

/**
 * get an Attendance by subjectId
 * @param {ObjectId} subjectId
 * @returns {Promise<Attendance>}
 */
const findAttendanceBySubjectId = (subjectId) => {
  return Attendance.findOne({ where: { subjectId } });
};

module.exports = {
  createAttendance,
  getAttendance,
  findAttendanceBySubjectId,
};
