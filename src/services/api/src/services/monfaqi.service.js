// Sequelize Models
const httpStatus = require('http-status');
const { Monfaqi, Student } = require('../models');
const ApiError = require('../utils/ApiError');
const { QueryTypes, Op } = require('sequelize');

/**
 * Create a Tabili
 * @param {Object} MonfaqiBody
 * @returns {Promise<Monfaqi>}
 */
const createMonfaqi = (MonfaqiBody) => {
  return Monfaqi.create(MonfaqiBody);
};

/**
 * Get all Monfaqi
 * @returns {Promise<Monfaqi>}
 */
const getMonfaqis = (limit, offset, like = '') => {
  return Monfaqi.findAndCountAll({
    order: [['createdAt', 'DESC']],
    limit,
    offset,
    include: [
      {
        model: Student,
        as: 'Student',
        where: {
          ['kankorId']: {
            [Op.like]: `${like || ''}%`,
          },
        },
      },
    ],
  });
};

/**
 * find Monfaqi by student id
 * @param {ObjectId} studentId
 * @returns {Promise<Monfaqi>}
 */
const findMonfaqiByStudentId = (studentId) => {
  return Monfaqi.findOne({ where: { studentId }, include: [{ model: Student, as: 'Student' }] });
};

/**
 * find Monfaqi by id
 * @param {ObjectId} MonfaqiId
 * @returns {Promise<Monfaqi>}
 */
const findMonfaqiById = (MonfaqiId) => {
  return Monfaqi.findOne({ where: { id: MonfaqiId }, include: [{ model: Student, as: 'Student' }] });
};

/**
 * delete Monfaqi
 * @param {Object} monfaqi
 * @returns {Promise<Monfaqi>}
 */
const deleteMonfaqi = (monfaqi) => {
  if (monfaqi instanceof Monfaqi) return monfaqi.destroy();
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
};

/**
 * update Monfaqi
 * @param {Object} oldMonfaqi
 * @param {Object} newMonfaqi
 * @returns {Promise<Monfaqi>}
 */
const updateMonfaqi = (oldMonfaqi, newMonfaqi) => {
  if (oldMonfaqi instanceof Monfaqi) {
    oldMonfaqi.set({
      ...newMonfaqi,
    });
    return oldMonfaqi.save();
  }
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
};

/**
 * find Monfaqicount or data by semester id
 * @param {ObjectId} studentKankorId
 * @returns {Promise<Taajil>}
 */
const findMonfaqiBySemesterId = async (semesterId, options = { count: false, gender: null }) => {
  const query = {
    where: { semesterId },
  };

  const results = (await Monfaqi.findAll(query))?.map((Monfaqi) => Monfaqi.studentId);

  const studentsQuery = {
    where: {
      id: results,
    },
  };

  if (options.gender) studentsQuery.where.gender = options.gender;

  return options.count ? await Student.count(studentsQuery) : await Student.findAll(studentsQuery);
};

/**
 * find Monfaqi by student kankor id
 * @param {ObjectId} studentKankorId
 * @returns {Promise<Monfaqi>}
 */
const findMonfaqiByStdKankorId = (studentKankorId) => {
  return Monfaqi.findOne({
    include: [{ model: Student, as: 'Student', where: { kankorId: studentKankorId } }],
  });
};

/**
 * find Monfaqi by educationalYearId
 * @param {Number} limit
 * @param {Number} offset
 * @param {ObjectId} yearId
 * @returns {Promise<Monfaqi>}
 */
const findMonfaqiByYearId = (limit, offset, yearId) => {
  return Monfaqi.findAndCountAll({
    where: { educationalYearId: yearId },
    order: [['createdAt', 'DESC']],
    limit,
    offset,
    include: [{ model: Student, as: 'Student' }],
  });
};

module.exports = {
  getMonfaqis,
  createMonfaqi,
  deleteMonfaqi,
  updateMonfaqi,
  findMonfaqiById,
  findMonfaqiByYearId,
  findMonfaqiByStudentId,
  findMonfaqiBySemesterId,
  updateMonfaqi,
  findMonfaqiById,
  findMonfaqiByStudentId,
  findMonfaqiBySemesterId,
  findMonfaqiByStdKankorId,
};
