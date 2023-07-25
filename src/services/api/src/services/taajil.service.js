const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Op } = require('sequelize');

// Sequelize Models
const { Taajil, Student } = require('../models');

/**
 * Create a taajil
 * @param {Object} taajilBody
 * @returns {Promise<Taajil>}
 */
const createTaajil = (taajilBody) => {
  return Taajil.create(taajilBody);
};

/**
 * Get Taajil students
 * @param {Number} limit
 * @param {Number} offset
 * @returns {Promise<Taajil>}
 */
const taajilStudents = (limit, offset) => {
  return Taajil.findAndCountAll({
    order: [['createdAt', 'DESC']],
    limit,
    offset,
    include: [{ model: Student, as: 'Student' }],
  });
};

/**
 * find Taajils by educationalYearId
 * @param {Number} limit
 * @param {Number} offset
 * @param {ObjectId} yearId
 * @returns {Promise<Taajil>}
 */
const findTaajilsByYearId = (limit, offset, yearId) => {
  return Taajil.findAndCountAll({
    where: { educationalYearId: yearId },
    order: [['createdAt', 'DESC']],
    limit,
    offset,
    include: [{ model: Student, as: 'Student' }],
  });
};

/**
 * find taajil by id
 * @param {ObjectId} id
 * @returns {Promise<Taajil>}
 */
const findTaajilById = (taajilId) => {
  return Taajil.findOne({
    where: { id: taajilId },
    include: [{ model: Student, as: 'Student' }],
  });
};

/**
 * delete taajil by student id
 * @param {ObjectId} studentId
 * @returns {Promise<Taajil>}
 */
const deleteTaajilByStudentId = (studentId) => {
  return Taajil.destroy({
    where: {
      studentId,
    },
  });
};

/**
 * find tajil by student id
 * @param {ObjectId} studentId
 * @returns {Promise<Taajil>}
 */
const findTaajilByStudentId = (studentId) => {
  return Taajil.findOne({
    where: {
      studentId,
    },
    include: [{ model: Student, as: 'Student' }],
  });
};

/**
 * find tajil by student kankor id
 * @param {ObjectId} studentKankorId
 * @returns {Promise<Taajil>}
 */
const findTaajilByStdKankorId = (studentKankorId) => {
  return Taajil.findOne({
    include: [{ model: Student, as: 'Student', where: { kankorId: studentKankorId } }],
  });
};

/**
 * find student all taajils by student id
 * @param {ObjectId} studentId
 * @returns {Promise<Taajil>}
 */
const findStudentAllTajils = (studentId) => {
  return Taajil.findAll({
    where: { studentId },
    order: [['createdAt', 'DESC']],
  });
};

/**
 * update taajil
 * @param {Object} oldTaajil
 * @param {Object} newTaajil
 * @returns {Promise<Taajil>}
 */
const updateTaajil = (oldTaajil, newTaajil) => {
  if (oldTaajil instanceof Taajil) {
    oldTaajil.set({
      ...newTaajil,
    });
    return oldTaajil.save();
  }
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong please try again');
};

/**
 * delete taajil
 * @param {Object} taajilBody
 * @returns {Promise<Taajil>}
 */
const deleteTaajil = (taajilBody) => {
  if (taajilBody instanceof Taajil) {
    return taajilBody.destroy();
  }
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong please try again');
};

/**
 * find tajil by student id and taajil type
 * @param {ObjectId} studentKankorId
 * @returns {Promise<Taajil>}
 */
const findTaajilByStudentIdAndType = async (studentId, type) => {
  return await Taajil.findOne({
    where: { studentId, type },
  });
};

/**
 * find tajil + special taajil count or data by semester id
 * @param {ObjectId} studentKankorId
 * @returns {Promise<Taajil>}
 */
const findTaajilBySemesterId = async (semesterId, options = { count: false, gender: null }) => {
  const query = {
    where: { semesterId, [Op.or]: [{ type: 'taajil' }, { type: 'special_taajil' }] },
  };

  const taajilStudents = (await Taajil.findAll(query))?.map((taajil) => taajil.studentId);

  const studentsQuery = {
    where: {
      id: taajilStudents,
    },
  };

  if (options.gender) studentsQuery.where.gender = options.gender;

  return options.count ? await Student.count(studentsQuery) : await Student.findAll(studentsQuery);
};

module.exports = {
  createTaajil,
  updateTaajil,
  taajilStudents,
  findTaajilById,
  deleteTaajil,
  findTaajilsByYearId,
  findStudentAllTajils,
  findTaajilByStudentId,
  findTaajilByStdKankorId,
  deleteTaajilByStudentId,
  findTaajilByStudentIdAndType,
  findTaajilBySemesterId,
};
