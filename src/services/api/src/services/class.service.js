// Sequelize Models
const { Classes } = require('../models');

/**
 * Create a Class
 * @param {Object} classBody
 * @returns {Promise<Classes>}
 */
const createClass = (classBody) => {
  return Classes.create(classBody);
};

/**
 * get all classes
 * @returns {Promise<Classes>}
 */
const getClasses = () => {
  return Classes.findAll({ include: 'EducationalYear' });
};

/**
 * delete class
 * @param {Object} classBody
 * @returns {Promise<Classes>}
 */
const deleteClass = (classBody) => {
  if (classBody instanceof Classes) return classBody.destroy();
};

/**
 * get single class
 * @param {ObjectId} classId
 * @returns {Promise<Classes>}
 */
const getClassById = (classId) => {
  return Classes.findOne({ where: { id: classId }, include: 'EducationalYear' });
};

/**
 * find class
 * @param {ObjectId} classBody
 * @returns {Promise<Classes>}
 */
const findClass = (classBody) => {
  return Classes.findOne({ where: { ...classBody } });
};

module.exports = {
  findClass,
  getClasses,
  createClass,
  deleteClass,
  getClassById,
};
