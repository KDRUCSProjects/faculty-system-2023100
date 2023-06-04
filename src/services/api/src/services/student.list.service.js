// Sequelize Models
const { StudentsList } = require('../models');

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

module.exports = {
  createStudentList,
  findListedStudentByStudentId,
};
