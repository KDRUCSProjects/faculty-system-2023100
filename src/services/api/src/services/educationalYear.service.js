// Sequelize Models

const semesterService = require('./Semester.service');
const { EducationalYear } = require('../models');

/**
 * Create a EducationalYear
 * @param {Object} year
 * @returns {Promise<EducationalYear>}
 */
const createEducationalYear = async (year) => {
  const newYear = await EducationalYear.create({ year });
  await semesterService.createFirstSemester(newYear.id);
  await semesterService.createSecondSemester(newYear.id);
  await semesterService.createThirdSemester(newYear.id);
  await semesterService.createFourthSemester(newYear.id);
  await semesterService.createFifthSemester(newYear.id);
  await semesterService.createSixthSemester(newYear.id);
  await semesterService.createSeventhSemester(newYear.id);
  await semesterService.createEighthSemester(newYear.id);
  return newYear;
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
const deleteEducationalYear = async (year) => {
  if (year instanceof EducationalYear) return await year.destroy();
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
  const theYear = await EducationalYear.findOne({ raw: true, where: { year } });

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
