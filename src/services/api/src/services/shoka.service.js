// Sequelize Models
const httpStatus = require('http-status');
const { Shoka } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Shoka
 * @param {Object} shokaBody
 * @returns {Promise<Shoka>}
 */
const createShoka = (shokaBody) => {
  return Shoka.create(shokaBody);
};

/**
 * find Shoka by ID
 * @param {Object} shokaId
 * @returns {Promise<Shoka>}
 */
const findShokaById = (shokaId) => {
  return Shoka.findOne({ where: { id: shokaId } });
};

/**
 * find Shoka by subject id
 * @param {ObjectId} subjectId
 * @returns {Promise<Shoka>}
 */
const findShokaBySubjectId = (subjectId) => {
  return Shoka.findOne({ where: { subjectId } });
};

/**
 * delete shoka
 * @param {Object} shoka
 * @returns {Promise<Shoka>}
 */
const deleteShoka = (shoka) => {
  if (shoka instanceof Shoka) {
    return shoka.destroy();
  }
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong please try again');
};

module.exports = {
  createShoka,
  deleteShoka,
  findShokaById,
  findShokaBySubjectId,
};
