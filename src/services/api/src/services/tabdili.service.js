// Sequelize Models
const httpStatus = require('http-status');
const { Tabdili, Student } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Tabili
 * @param {Object} tabdiliBody
 * @returns {Promise<Tabdili>}
 */
const createTabdili = (tabdiliBody) => {
  return Tabdili.create(tabdiliBody);
};

/**
 * Get all tabdili
 * @param {Number} limit
 * @param {Number} offset
 * @returns {Promise<Tabdili>}
 */
const getTabdilis = (limit, offset) => {
  return Tabdili.findAndCountAll({
    order: [['createdAt', 'DESC']],
    limit,
    offset,
    include: [{ model: Student, as: 'Student' }],
  });
};

/**
 * find tabdili by student id
 * @param {ObjectId} studentId
 * @returns {Promise<Tabdili>}
 */
const findTabdiliByStudentId = (studentId) => {
  return Tabdili.findOne({ where: { studentId } });
};

/**
 * find tabdili by id
 * @param {ObjectId} tabdiliId
 * @returns {Promise<Tabdili>}
 */
const findTabdiliById = (tabdiliId) => {
  return Tabdili.findOne({ where: { id: tabdiliId } });
};

/**
 * delete tabdili
 * @param {Object} tabdili
 * @returns {Promise<Tabdili>}
 */
const deleteTabdili = (tabdili) => {
  if (tabdili instanceof Tabdili) return tabdili.destroy();
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
};

/**
 * update tabdili
 * @param {Object} oldTabdili
 * @param {Object} newTabdili
 * @returns {Promise<Tabdili>}
 */
const updateTabdili = (oldTabdili, newTabdili) => {
  if (oldTabdili instanceof Tabdili) {
    oldTabdili.set({
      ...newTabdili,
    });
    return oldTabdili.save();
  }
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
};

/**
 * find tabdilicount or data by semester id
 * @param {ObjectId} studentKankorId
 * @returns {Promise<Taajil>}
 */
const findTabdiliBySemesterId = async (semesterId, onlyCount = true) => {
  const query = {
    where: { semesterId },
  };

  return onlyCount ? await Tabdili.count(query) : await Tabdili.findAll(query);
};

module.exports = {
  getTabdilis,
  createTabdili,
  deleteTabdili,
  updateTabdili,
  findTabdiliById,
  findTabdiliByStudentId,
  findTabdiliBySemesterId,
};
