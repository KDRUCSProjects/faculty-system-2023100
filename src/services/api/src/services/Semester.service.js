// Sequelize Models
const { Semester, EducationalYear } = require('../models');

/**
 * Create first Semester
 * @param {ObjectId} educationalYearId
 * @returns {Promise<Semester>}
 */
const createFirstSemester = (educationalYearId) => {
  return Semester.create({
    title: 1,
    educationalYearId,
  });
};

/**
 * Create Second Semester
 * @param {ObjectId} educationalYearId
 * @returns {Promise<Semester>}
 */
const createSecondSemester = (educationalYearId) => {
  return Semester.create({
    title: 2,
    educationalYearId,
  });
};

/**
 * Create Third Semester
 * @param {ObjectId} educationalYearId
 * @returns {Promise<Semester>}
 */
const createThirdSemester = (educationalYearId) => {
  return Semester.create({
    title: 3,
    educationalYearId,
  });
};

/**
 * Create Fourth Semester
 * @param {ObjectId} educationalYearId
 * @returns {Promise<Semester>}
 */
const createFourthSemester = (educationalYearId) => {
  return Semester.create({
    title: 4,
    educationalYearId,
  });
};

/**
 * Create Fifth Semester
 * @param {ObjectId} educationalYearId
 * @returns {Promise<Semester>}
 */
const createFifthSemester = (educationalYearId) => {
  return Semester.create({
    title: 5,
    educationalYearId,
  });
};

/**
 * Create sixth Semester
 * @param {ObjectId} educationalYearId
 * @returns {Promise<Semester>}
 */
const createSixthSemester = (educationalYearId) => {
  return Semester.create({
    title: 6,
    educationalYearId,
  });
};

/**
 * Create Seventh Semester
 * @param {ObjectId} educationalYearId
 * @returns {Promise<Semester>}
 */
const createSeventhSemester = (educationalYearId) => {
  return Semester.create({
    title: 7,
    educationalYearId,
  });
};

/**
 * Create Eighth Semester
 * @param {ObjectId} educationalYearId
 * @returns {Promise<Semester>}
 */
const createEighthSemester = (educationalYearId) => {
  return Semester.create({
    title: 8,
    educationalYearId,
  });
};

/**
 * Get All Semesters with education year
 * @returns {Promise<Semester>}
 */
const getAllSemesters = () => {
  return Semester.findAll({
    include: [{ model: EducationalYear, as: 'EducationalYear', attributes: ['year'] }],
  });
};

/**
 * find Semesters with education year
 * @returns {Promise<Semester>}
 * @param {Object} semesterBody
 */
const findSemester = (semesterBody) => {
  return Semester.findOne({
    where: { ...semesterBody },
  });
};

/**
 * create new Semester
 * @returns {Promise<Semester>}
 * @param {Object} semesterBody
 */
const createNewSemester = (semesterBody) => {
  return Semester.findOne(semesterBody);
};

/**
 * get Semester
 * @returns {Promise<Semester>}
 * @param {ObjectId} semesterId
 */
const findSemesterById = (semesterId) => {
  return Semester.findOne({
    where: { id: semesterId },
    include: [{ model: EducationalYear, as: 'EducationalYear', attributes: ['year'] }],
  });
};

/**
 * delete  Semester
 * @returns {Promise<Semester>}
 * @param {Object} semesterBody
 */
const deleteSemester = (semester) => {
  if (semester instanceof Semester) return semester.destroy();
};

/**
 * get Semesters of the year
 * @param {ObjectId} educationalYearId
 * @returns {Promise<Semester>}
 */
const getYearSemesters = (educationalYearId) => {
  return Semester.findAll({ where: { educationalYearId }, order: [['title', 'ASC']] })
};


module.exports = {
  createFirstSemester,
  createSecondSemester,
  createThirdSemester,
  createFourthSemester,
  createFifthSemester,
  createSixthSemester,
  createSeventhSemester,
  createEighthSemester,
  getAllSemesters,
  findSemester,
  createNewSemester,
  findSemesterById,
  deleteSemester,
  getYearSemesters,
};
