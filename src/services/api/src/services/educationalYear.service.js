// Sequelize Models
const httpStatus = require('http-status');
const { EducationalYear } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a EducationalYear
 * @param {Object} year
 * @returns {Promise<EducationalYear>}
 */
const createEducationalYear = (year) => {
  return EducationalYear.create({ year });
};

/**
 * get all EducationalYears
 * @returns {Promise<EducationalYear>}
 */
const getEducationalYears = () => {
  return EducationalYear.findAll({ order: [['year', 'DESC']] });
};

/**
 * delete Educational Year
 * @param {Object} year
 * @returns {Promise<EducationalYear>}
 */
const deleteEducationalYear = (year) => {
  if (year instanceof EducationalYear) return year.destroy();
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong please try again');
};

/**
 * get Education Year
 * @param {ObjectId} yearId
 * @returns {Promise<EducationalYear>}
 */
const getEducationalYear = (yearId) => {
  return EducationalYear.findOne({ where: { id: yearId } });
};

/**
 * find next year
 * @param {Number} year
 * @returns {Promise<EducationalYear>}
 */
const findNextYear = (year) => {
  const nextYear = year + 1;
  return EducationalYear.findOne({ where: { year: nextYear } });
};

/**
 * create next educational year
 * @param {Number} year
 * @returns {Promise<EducationalYear>}
 */
const createNextEducationalYear = (year) => {
  const nextYear = year + 1;
  return EducationalYear.create({ year: nextYear });
};

/**
 * find Educational year by value
 * @param {ObjectId} year
 * @returns {Promise<EducationalYear>}
 */
const findEducationalYearByValue = async (year) => {
  const theYear = await EducationalYear.findOne({ raw: true, where: { year } });

  // We only want the id
  return theYear ? theYear.id : null;
};

/**
 * get educational year by value
 * @param {Number} year
 * @returns {Promise<EducationalYear>}
 */
const getEducationalYearByValue = (year) => {
  return EducationalYear.findOne({ where: { year } });
};

/**
 * get current educational year
 * @returns {Promise<EducationalYear>}
 */
const getCurrentEducationalYear = () => {
  return EducationalYear.findOne({ where: { onGoing: true } });
};

module.exports = {
  findNextYear,
  createEducationalYear,
  getEducationalYears,
  deleteEducationalYear,
  getEducationalYear,
  createNextEducationalYear,
  getEducationalYearByValue,
  getCurrentEducationalYear,
  findEducationalYearByValue,
};
