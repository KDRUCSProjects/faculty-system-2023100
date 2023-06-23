// Sequelize Models
const httpStatus = require('http-status');
const { Subject, StudentsList, Student } = require('../models');
const ApiError = require('../utils/ApiError');

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



/**
 * update subject
 * @param {Object} oldSubjectBody
 * @param {Object} newSubjectBody
 * @returns {Promise<Student>}
 */
const updatedSubject = (oldSubjectBody, newSubjectBody) => {
  if (oldSubjectBody instanceof Subject) {
    oldSubjectBody.set({
      ...newSubjectBody
    });
    return oldSubjectBody.save();
  }
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
};


module.exports = {
  getSemesterStudents,
  getSubject,
  createSubject,
  getSubjects,
  deleteSubject,
  getTeacherSubjects,
  updatedSubject,
};
