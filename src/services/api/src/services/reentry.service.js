const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

// Sequelize Models
const { Reentry, Student } = require('../models');
/**
 * Create reentry
 * @param {Object} reentryBody
 * @returns {Promise<Reentry>}
 */
const createReentry = (reentryBody) => {
  return Reentry.create(reentryBody);
};

/**
 * Get Reentry students
 * @param {Number} limit
 * @param {Number} offset
 * @returns {Promise<Reentry>}
 */
const reentryStudents = (limit, offset) => {
  return Reentry.findAndCountAll({
    order: [['createdAt', 'DESC']],
    limit,
    offset,
    include: [{ model: Student, as: 'Student' }],
  });
};

/**
 * find Taajils by educationalYearId
 * @param {Number} limit
 * @param {Number} offset
 * @param {ObjectId} yearId
 * @returns {Promise<Taajil>}
 */
const findReentriesByYearId = (limit, offset, yearId) => {
  return Taajil.findAndCountAll({
    where: { educationalYearId: yearId },
    order: [['createdAt', 'DESC']],
    limit,
    offset,
    include: [{ model: Student, as: 'Student' }],
  });
};

/**
 * find reentry by student id and year id
 * @param {Number} studentId
 * @param {Number} educationalYearId
 * @returns {Promise<Reentry>}
 */
const findReentryByStdIdAndYearId = (studentId, educationalYearId) => {
  return Reentry.findOne({ where: { studentId, educationalYearId } });
};

/**
 * find reentry by student id
 * @param {ObjectId} studentId
 * @returns {Promise<Reentry>}
 */
const findReentryByStudentId = (studentId) => {
  return Reentry.findOne({
    where: {
      studentId,
    },
    include: [{ model: Student, as: 'Student' }],
  });
};

/**
 * find reentry by student kankor id
 * @param {ObjectId} studentKankorId
 * @returns {Promise<Reentry>}
 */
const findReentryByStdKankorId = (studentKankorId) => {
  return Reentry.findOne({
    include: [{ model: Student, as: 'Student', where: { kankorId: studentKankorId } }],
  });
};

/**
 * find reentry by id
 * @param {ObjectId} reentryId
 * @returns {Promise<Reentry>}
 */
const findReentryById = (reentryId) => {
  return Reentry.findOne({
    where: { id: reentryId },
    include: [{ model: Student, as: 'Student' }],
  });
};

/**
 * delete reentry
 * @param {Object} oldReentry
 * @returns {Promise<Reentry>}
 */
const deleteReentry = (oldReentry) => {
  if (oldReentry instanceof Reentry) {
    return oldReentry.destroy();
  }
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong please try again');
};

module.exports = {
  createReentry,
  deleteReentry,
  reentryStudents,
  findReentryById,
  findReentriesByYearId,
  findReentryByStudentId,
  findReentryByStdKankorId,
  findReentryByStdIdAndYearId,
};
