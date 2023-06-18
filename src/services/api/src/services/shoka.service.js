// Sequelize Models
const { Shoka } = require('../models');

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

module.exports = {
  createShoka,
  findShokaById,
};
