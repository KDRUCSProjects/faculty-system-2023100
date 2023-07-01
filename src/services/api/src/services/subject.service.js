// Sequelize Models
const httpStatus = require('http-status');
const { QueryTypes } = require('sequelize');
const { Subject, StudentsList, Student, sequelize } = require('../models');
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
  return sequelize.query(
    `
    select subject.id as id,
    subject.name as name,
    subject.credit as credit,
    subject.teacherId as teacherId,
    subject.semesterId as semesterId,
    subject.deletedAt as deletedAt,
    user.name as teacherName,
    semester.title as semesterTitle,
    semester.educationalYearId as educationalYearId,
    educationalYear.year as educationalYear
    from subjects as subject
    left join users as user on user.id = subject.teacherId
    left join semesters as semester on semester.id = subject.semesterId
    left join educationalYears as educationalYear on educationalYear.id = semester.educationalYearId
    where subject.deletedAt IS NULL
  `,
    { type: QueryTypes.SELECT }
  );
};

/**
 * delete a subject
 * @param {Object} subject
 * @param {Object} user
 * @returns {Promise<Subject>}
 */
const deleteSubject = (user, subject) => {
  if (subject instanceof Subject) {
    subject.set({ deletedBy: user.id, isDeleted: true });
    return subject.destroy();
  }
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong please try again');
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
      ...newSubjectBody,
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
