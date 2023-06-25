// Sequelize Models
const httpStatus = require('http-status');
const { StudentsList } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * add student to a semester
 * @param {Object} listedStudentBody
 * @returns {Promise<StudentsList>}
 */
const createStudentList = (listedStudentBody) => {
  return StudentsList.create(listedStudentBody);
};

/**
 * find student in list
 * @param {ObjectId} listedStudentId
 * @returns {Promise<StudentsList>}
 */
const findListedStudentByStudentId = (listedStudentId) => {
  return StudentsList.findOne({ where: { studentId: listedStudentId } });
};

/**
 * get all student list
 * @returns {Promise<StudentsList>}
 */
const getStudentLists = () => {
  return StudentsList.findAll({ order: [['createdAt', 'ASC']] });
};

/**
 * get student list
 * @param {ObjectId} studentListId
 * @returns {Promise<StudentsList>}
 */
const findStudentListById = (studentListId) => {
  return StudentsList.findOne({ where: { id: studentListId } });
};

/**
 * delete student list
 * @param {Object} studentListBody
 * @returns {Promise<StudentsList>}
 */
const deleteStudentList = (studentListBody) => {
  if (studentListBody instanceof StudentsList) return studentListBody.destroy();
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
};

module.exports = {
  getStudentLists,
  createStudentList,
  deleteStudentList,
  findStudentListById,
  findListedStudentByStudentId,
};
