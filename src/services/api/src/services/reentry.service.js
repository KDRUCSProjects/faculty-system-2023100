const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

// Sequelize Models
const { Reentry } = require('../models');
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
  //   if (await Taajil.studentAlreadyHaveTaajil(reentryBody.studentId)) {
  //     throw new ApiError(httpStatus.BAD_REQUEST, 'Student already has taken reentry twice');
  //   }

  return await Reentry.create({
    studentId: reentryBody.studentId,
    educationalYearId: educationalYearId.dataValues.id,
    regNumber: reentryBody.regNumber,
    notes: reentryBody.notes,
    attachment: reentryBody.attachment,
  });
};

// Delete a reentry
module.exports = {
  createReentry,
};
