// Sequelize Models
const { StudentsList } = require('../models');

/**
 * find student in list
 * @param {ObjectId} listedStudentId
 * @returns {Promise<StudentsList>}
 */
const findListedStudentByStudentId = (listedStudentId) => {
  return StudentsList.findOne({ where: { studentId: listedStudentId } });
};

module.exports = {
  findListedStudentByStudentId,
};
