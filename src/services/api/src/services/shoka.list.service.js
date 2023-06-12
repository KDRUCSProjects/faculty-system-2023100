// Sequelize Models
const { ShokaList } = require('../models');

/**
 * Create a shoka list
 * @returns {Promise<ShokaList>}
 * @param {Object} shokaListBody
 */
const createShokaList = (shokaListBody) => {
  return ShokaList.create(shokaListBody);
};

/**
 * Get Shoka List
 * @param {ObjectId} shokaId
 * @returns {Promise<ShokaList>}
 */
const getShokaList = (shokaId) => {
  return ShokaList.findAll({ where: { shokaId } });
};

/**
 * find Student if he has gotten marks in same subject
 * @param {ObjectId} shokaId
 * @param {ObjectId} studentId
 * @returns {Promise<ShokaList>}
 */
const isStudentListedInShokaList = (shokaId, studentId) => {
  return ShokaList.findOne({
    where: { shokaId, studentId },
  });
};

module.exports = {
  createShokaList,
  getShokaList,
  isStudentListedInShokaList,
};
