// Sequelize Models
const { Op } = require('sequelize');
const { AttendanceList } = require('../models');

/**
 * create attendance
 * @param {Object} attendanceBody
 * @returns {Promise<AttendanceList>}
 */
const createAttendance = (attendanceBody) => {
  return AttendanceList.create(attendanceBody);
};

/**
 * get attendance by date attendance id and student Id
 * @param {ObjectId} studentId
 * @param {ObjectId} subjectId
 * @param {Date} date
 * @returns {Promise<AttendanceList>}
 */
const findAttendanceByDateAndStudentId = (studentId, subjectId, date) => {
  const startOfTheDay = new Date(date);
  const endOfTheDay = new Date(date);
  startOfTheDay.setUTCHours(0, 0, 0, 0);
  endOfTheDay.setUTCHours(23, 59, 59, 999);
  return AttendanceList.findOne({
    where: {
      studentFK: studentId,
      subjectFK: subjectId,
      date: {
        [Op.gt]: startOfTheDay,
        [Op.lt]: endOfTheDay,
      },
    },
  });
};

module.exports = {
  createAttendance,
  findAttendanceByDateAndStudentId,
};
