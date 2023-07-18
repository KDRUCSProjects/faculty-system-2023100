// Sequelize Models
const httpStatus = require('http-status');
const { Semester, EducationalYear, Subject, User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Get All Semesters with education year
 * @returns {Promise<Semester>}
 */
const getAllSemesters = () => {
  return Semester.findAll({
    include: [{ model: EducationalYear, as: 'EducationalYear', attributes: ['year'] }, { model: Subject }],
  });
};

/**
 * find semester by id
 * @param {Number} semesterId
 * @returns {Promise<Semester>}
 */
const findById = (semesterId) => {
  return Semester.findOne({
    where: { id: semesterId },
  });
};

/**
 * find semester by id
 * @param {Number} semesterId
 * @returns {Promise<Semester>}
 */
const isSemesterOnGoing = (semesterId) => {
  return Semester.findOne({
    where: { id: semesterId },
    include: [
      {
        model: EducationalYear,
        as: 'EducationalYear',
        where: { onGoing: true },
        required: true,
      },
    ],
  });
};

/**
 * find Semesters with education year
 * @param {Object} semesterBody
 * @returns {Promise<Semester>}
 */
const findSemester = (semesterBody) => {
  return Semester.findOne({
    where: { ...semesterBody },
  });
};

/**
 * get Semester
 * @param {ObjectId} semesterId
 * @returns {Promise<Semester>}
 */
const findSemesterById = (semesterId) => {
  return Semester.findOne({
    where: { id: semesterId },
    include: [
      { model: EducationalYear, as: 'EducationalYear', attributes: ['year'] },
      { model: Subject, include: [{ model: User }] },
    ],
  });
};

/**
 * find next Semester of year
 * @param {ObjectId} yearId
 * @param {ObjectId} semesterTitle
 * @returns {Promise<Semester>}
 */
const findNextSemester = (yearId, semesterTitle) => {
  const nextTitle = semesterTitle + 1;
  return Semester.findOne({
    where: { educationalYearId: yearId, title: nextTitle },
  });
};

/**
 * delete  Semester
 * @returns {Promise<Semester>}
 * @param {Object} semesterBody
 */
const deleteSemester = (semester) => {
  if (semester instanceof Semester) return semester.destroy();
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong please try again');
};

/**
 * get Semesters of the year
 * @param {ObjectId} educationalYearId
 * @returns {Promise<Semester>}
 */
const getYearSemesters = (educationalYearId) => {
  return Semester.findAll({
    where: { educationalYearId },
    order: [['title', 'ASC']],
    include: [{ model: Subject }],
  });
};

/**
 * find semester by year and title
 * @param {ObjectId} semesterId
 * @returns {Promise<Semester>}
 */
const findSemesterByYearIdAndTitle = async (educationalYearId, title) => {
  return await Semester.findOne({
    where: {
      educationalYearId,
      title,
    },
    raw: true,
  });
};

module.exports = {
  findById,
  findSemester,
  deleteSemester,
  getAllSemesters,
  findNextSemester,
  findSemesterById,
  getYearSemesters,
  findSemesterByYearIdAndTitle,
  isSemesterOnGoing,
};
