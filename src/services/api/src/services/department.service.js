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

/**
 * find department by id
 * @param {ObjectId} departmentId
 * @returns {Promise<Department>}
 */
const findById = (departmentId) => {
  return Department.findOne({ where: { id: departmentId } });
};

/**
 * get all departments
 * @returns {Promise<Department>}
 */
const getDepartments = () => {
  return Department.findAll({ order: [['id', 'ASC']] });
};

/**
 * delete a departments
 * @param {Object} departmentBody
 * @returns {Promise<Department>}
 */
const deleteDepartment = (departmentBody) => {
  if (departmentBody instanceof Department) return departmentBody.destroy();
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'some thing went wrong. please try again');
};

/**
 * update department
 * @param {Object} oldDepartment
 * @param {Object} newDepartment
 * @returns {Promise<Department>}
 */
const updateDepartment = (oldDepartment, newDepartment) => {
  if (oldDepartment instanceof Department) {
    oldDepartment.set({
      ...oldDepartment,
      ...newDepartment,
    });
    return oldDepartment.save();
  }
};

module.exports = {
  findById,
  getDepartments,
  updateDepartment,
  deleteDepartment,
  createDepartment,
};
