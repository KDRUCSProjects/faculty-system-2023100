// Sequelize Models
const { Semester } = require('../models');

/**
 * Create first Semester
 * @param {ObjectId} classId
 * @returns {Promise<Semester>}
 */
const createFirstSemester = (classId) => {
  return Semester.create({
    title: 1,
    classId,
  });
};

/**
 * Create Second Semester
 * @param {ObjectId} classId
 * @returns {Promise<Semester>}
 */
const createSecondSemester = (classId) => {
  return Semester.create({
    title: 2,
    classId,
  });
};

module.exports = {
  createFirstSemester,
  createSecondSemester,
};
