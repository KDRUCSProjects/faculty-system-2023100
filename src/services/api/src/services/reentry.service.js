const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

// Sequelize Models
const { Reentry, Student } = require('../models');
const { educationalYearService } = require('.');

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
 * @param {Array} taajilBody
 * @returns {Promise<Taajil>}
 */

const reentryStudents = async (query) => {
  // If filter by year was requested:
  if (query.educationalYear) {
    return await getAllStudentsWithReentryByYear(query.educationalYear);
  }

  // Get all reentry students
  return getAllStudentsWithReentry();
};

const getAllStudentsWithReentry = async () => {
  return await Reentry.findAll();
};

const getAllStudentsWithReentryByYear = async (year) => {
  const educationalYearId = await educationalYearService.findEducationalYearByValue(year);

  if (!educationalYearId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No educational year found');
  }

  return await Reentry.findAll({
    where: {
      educationalYearId,
    },
  });
};

const deleteReentryById = async (id) => {
  return await Reentry.destroy({
    where: {
      id,
    },
  });
};

const deleteReentry = async (id) => {
  const theReentry = await findReentryById(id);

  if (!theReentry) {
    throw new ApiError(httpStatus.NOT_FOUND, `No reentry found by id: ${id}`);
  }

  // Delete/remove reentry from the student
  await deleteReentryById(id);

  // Let's send the student that reentry was removed from him/her
  return await Student.findOne({ where: { id: theReentry.studentId } });
};

const findReentryById = async (id) => {
  return await Reentry.findOne({
    where: {
      id,
    },
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

// Delete a reentry
module.exports = {
  createReentry,
  deleteReentry,
  reentryStudents,
  deleteReentryById,
  findReentryByStdIdAndYearId,
};
