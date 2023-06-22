// Sequelize Models
const { Subject, StudentsList, Student } = require('../models');

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

/**
 * get teacher subjects
 * @param {ObjectId} teacherId
 * @returns {Promise<Student>}
 */
const getTeacherSubjects = (teacherId) => {
  return Subject.findAll({ where: { teacherId }, order: [['createdAt', 'ASC']] });
};

/**
 * get teach
 * @param {ObjectId} semesterId
 * @returns {Promise<StudentsList>}
 */
const getSemesterStudents = (semesterId) => {
  return StudentsList.findAll({
    where: { semesterId },
    include: [
      {
        model: Student,
        as: 'Student',
        required: true,
      },
    ],
  });
};

module.exports = {
  getSemesterStudents,
  getSubject,
  createSubject,
  getSubjects,
  deleteSubject,
  getTeacherSubjects,
};
