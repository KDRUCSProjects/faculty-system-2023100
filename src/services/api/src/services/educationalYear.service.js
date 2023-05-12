// Sequelize Models
const { EducationalYear } = require('../models');

/**
 * Create a EducationalYear
 * @param {Object} yearBody
 * @returns {Promise<EducationalYear>}
 */
const createEducationalYear = (yearBody) => {
  return EducationalYear.create(yearBody);
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

module.exports = {
  createEducationalYear,
  getEducationalYears,
  deleteEducationalYear,
  getEducationalYear,
};
