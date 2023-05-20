// Sequelize Models
const { EducationalYear } = require('../models');

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
  return EducationalYear.findAll();
};

/**
 * delete Educational Year
 * @param {Object} year
 * @returns {Promise<EducationalYear>}
 */
const deleteEducationalYear = (year) => {
  if (year instanceof EducationalYear) return year.destroy();
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
 * find Educational year by value
 * @param {ObjectId} year
 * @returns {Promise<EducationalYear>}
 */
const findEducationalYearByValue = async (year) => {
  return await EducationalYear.findOne({ where: { year } });
};

module.exports = {
  createEducationalYear,
  getEducationalYears,
  deleteEducationalYear,
  getEducationalYear,
  findEducationalYearByValue,
};
