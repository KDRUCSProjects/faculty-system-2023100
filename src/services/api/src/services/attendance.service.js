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

/**
 * get all Attendances
 * @returns {Promise<Attendance>}
 */
const getAttendances = () => {
  return Attendance.findAll({ order: [['createdAt', 'ASC']] });
};

module.exports = {
  getAttendance,
  getAttendances,
  createAttendance,
  findAttendanceBySubjectId,
};
