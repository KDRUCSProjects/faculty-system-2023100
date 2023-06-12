// Sequelize Models
const { Op } = require('sequelize');
const { AttendanceList } = require('../models');

/**
 * create attendance
 * @param {Object} attendanceBody
 * @returns {Promise<AttendanceList>}
 */
const createAttendance = (attendanceBody) => {
  return AttendanceList.bulkCreate(attendanceBody);
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
 * get attendance by date attendance id and student Id
 * @param {ObjectId} studentId
 * @param {ObjectId} attendanceFK
 * @returns {Promise<AttendanceList>}
 */
const findAttendanceByDateAndStudentId = (studentId, attendanceId) => {
  const startOfTheDay = new Date(Date.now());
  const endOfTheDay = new Date(Date.now());
  // start of the day
  startOfTheDay.setUTCHours(0, 0, 0, 0);
  // end of the day
  endOfTheDay.setUTCHours(23, 59, 59, 999);
  return AttendanceList.findOne({
    where: {
      studentId,
      attendanceId,
      createdAt: {
        [Op.gt]: startOfTheDay,
        [Op.lt]: endOfTheDay,
      },
    },
  });
};

module.exports = {
  createAttendance,
  getAttendance,
  findAttendanceByDateAndStudentId,
};
