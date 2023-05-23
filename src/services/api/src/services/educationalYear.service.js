// Sequelize Models

const { EducationalYear } = require('../models');

/**
 * Create a EducationalYear
 * @param {Object} year
 * @returns {Promise<EducationalYear>}
 */
const createEducationalYear = async (year) => {
  return await EducationalYear.create({ year });
};

/**
 * get all EducationalYears
 * @returns {Promise<EducationalYear>}
 */
const getEducationalYears = async () => {
  return await EducationalYear.findAll();
};

/**
 * delete Educational Year
 * @param {Object} year
 * @returns {Promise<EducationalYear>}
 */
const deleteEducationalYear = async (year) => {
  if (year instanceof EducationalYear) return await year.destroy();
};

/**
 * get Education Year
 * @param {ObjectId} yearId
 * @returns {Promise<EducationalYear>}
 */
const getEducationalYear = async (yearId) => {
  return await EducationalYear.findOne({ where: { id: yearId } });
};

/**
 * find Educational year by value
 * @param {ObjectId} year
 * @returns {Promise<EducationalYear>}
 */
const findEducationalYearByValue = async (year) => {
  let theYear = await EducationalYear.findOne({ raw: true, where: { year } });

  // We only want the id
  return theYear ? theYear.id : null;
};

module.exports = {
  createEducationalYear,
  getEducationalYears,
  deleteEducationalYear,
  getEducationalYear,
  findEducationalYearByValue,
};
