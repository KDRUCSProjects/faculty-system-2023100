const { http } = require('../config/logger');
const { semesterService, educationalYearService } = require('../services');
const ApiError = require('./ApiError');
const httpStatus = require('http-status');

/**
 * find in which semester should the student must be enrolled after taajil, repeat or mahrom
 * @param {ObjectId} semesterId
 * @returns {Promise<Semester>}
 */
const findEligibleNextSemesterAfterConversion = async (semesterId) => {
  const currentSemester = await semesterService.findById(semesterId);

  // What if we throw Api Error?
  if (!currentSemester) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Semester not found');
  }

  let currentSemesterYear = await educationalYearService.getEducationalYear(currentSemester.educationalYearId);

  const nextSemesterYearId = await educationalYearService.findEducationalYearByValue(1 + currentSemesterYear.year);

  if (!nextSemesterYearId) {
    throw new ApiError(httpStatus.NOT_FOUND, `Please create next educational year first!`);
  }

  // Let's find our eligible semester by passing our next year and the title of (semester)
  return await semesterService.findSemesterByYearIdAndTitle(nextSemesterYearId, currentSemester.title);
};

module.exports = {
  findEligibleNextSemesterAfterConversion,
};
