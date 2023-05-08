const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

// Sequelize Models
const { Department } = require('../models');

/**
 * Create a department
 * @param {Object} departmentBody
 * @returns {Promise<Department>}
 */
const createDepartment = async (userBody) => {
  if (await Department.departmentNameIsTaken(userBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Department name is already taken');
  }
  return Department.create(userBody);
};

// Update department

// Get departments

// Delete a department
module.exports = {
  createDepartment,
};
