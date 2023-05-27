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

module.exports = {
  createShoka,
};
