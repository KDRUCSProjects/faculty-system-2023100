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
const createReentry = async (reentryBody) => {
  let educationalYearId = await educationalYearService.findEducationalYearByValue(reentryBody.educationalYear);
  if (!educationalYearId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Educational year not found or created');
  }

  // if a student has already been given a reentry twice
  // Should be prevented:

  return await Reentry.create({
    studentId: reentryBody.studentId,
    educationalYearId: educationalYearId,
    regNumber: reentryBody.regNumber,
    notes: reentryBody.notes,
    attachment: reentryBody.attachment,
  });
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
  let educationalYearId = await educationalYearService.findEducationalYearByValue(year);

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

// Delete a reentry
module.exports = {
  createReentry,
  deleteReentry,
  reentryStudents,
  deleteReentryById,
};
