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
  return ShokaList.findAll({ where: { shokaFK: shokaId } });
};

/**
 * find Student if he has gotten marks in same subject
 * @param {ObjectId} shokaFK
 * @param {ObjectId} studentFK
 * @returns {Promise<ShokaList>}
 */
const isStudentListedInShokaList = (shokaFK, studentFK) => {
  return ShokaList.findOne({
    where: { shokaFK, studentFK },
  });
};

module.exports = {
  createShokaList,
  getShokaList,
  isStudentListedInShokaList,
};
