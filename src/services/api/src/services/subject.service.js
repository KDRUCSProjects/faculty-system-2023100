// Sequelize Models
const { Subject } = require('../models');

/**
 * Create a Subject
 * @param {Object} subjectBody
 * @returns {Promise<Subject>}
 */
const createSubject = (subjectBody) => {
  return Subject.create(subjectBody);
};

/**
 * Get all Subjects
 * @returns {Promise<Subject>}
 */
const getSubjects = () => {
  return Subject.findAll();
};

/**
 * delete a subject
 * @param {Object} subject
 * @returns {Promise<Subject>}
 */
const deleteSubject = (subject) => {
  if (subject instanceof Subject) return subject.destroy();
};

/**
 * get a single subject
 * @param {ObjectId} subjectId
 * @returns {Promise<Student>}
 */
const getSubject = (subjectId) => {
  return Subject.findOne({ where: { id: subjectId } });
};

module.exports = {
  getSubject,
  createSubject,
  getSubjects,
  deleteSubject,
};
