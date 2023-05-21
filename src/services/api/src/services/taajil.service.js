const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

// Sequelize Models
const { Taajil } = require('../models');
const { educationalYearService } = require('.');

/**
 * Create a department
 * @param {Object} taajilBody
 * @returns {Promise<Taajil>}
 */
const createTaajil = async (taajilBody) => {
  let educationalYearId = await educationalYearService.findEducationalYearByValue(taajilBody.educationalYear);
  if (!educationalYearId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Educational year not found or created');
  }

  // if a student has already been given a taajil
  if (await Taajil.studentAlreadyHaveTaajil(taajilBody.studentId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Student already has Taajil');
  }

  return await Taajil.create({
    studentId: taajilBody.studentId,
    educationalYearId: educationalYearId.dataValues.id,
    regNumber: taajilBody.regNumber,
    notes: taajilBody.notes,
    attachment: taajilBody.attachment,
  });
};

// Get taajil

// Delete a taajil
module.exports = {
  createTaajil,
};
