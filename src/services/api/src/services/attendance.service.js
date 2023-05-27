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

module.exports = {
  createAttendance,
};
