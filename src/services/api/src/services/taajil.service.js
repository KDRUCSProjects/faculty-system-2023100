const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

// Sequelize Models
const { Taajil, Student } = require('../models');
const { educationalYearService } = require('.');

/**
 * Create a taajil
 * @param {Object} taajilBody
 * @returns {Promise<Taajil>}
 */
const createTaajil = async (taajilBody) => {
  const educationalYearId = await educationalYearService.findEducationalYearByValue(taajilBody.educationalYear);
  // if a student has already been given a taajil
  if (await Taajil.studentAlreadyHaveTaajil(taajilBody.studentId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Student already has Taajil');
  }

  return await Taajil.create({
    studentId: taajilBody.studentId,
    educationalYearId,
    regNumber: taajilBody.regNumber,
    notes: taajilBody.notes,
    attachment: taajilBody.attachment,
  });
};

/**
 * Get Taajil students
 * @param {Array} taajilBody
 * @returns {Promise<Taajil>}
 */

const taajilStudents = async (query) => {
  // If filter by year was requested:
  if (query.educationalYear) {
    return await getAllStudentsWithTaajilByYear(query.educationalYear);
  }

  // Get all Taajil students
  return getAllStudentsWithTaajil();
};

const getAllStudentsWithTaajil = async () => {
  return await Taajil.findAll();
};

const getAllStudentsWithTaajilByYear = async (year) => {
  const educationalYearId = await educationalYearService.findEducationalYearByValue(year);

  if (!educationalYearId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No educational year found');
  }

  return await Taajil.findAll({
    where: {
      educationalYearId,
    },
  });
};

const deleteTaajilByStudentId = async (studentId) => {
  return await Taajil.destroy({
    where: {
      studentId,
    },
  });
};

const deleteTaajil = async (studentId) => {
  const taajilStudent = await findTaajilByStudentId(studentId);

  if (!taajilStudent) {
    throw new ApiError(httpStatus.NOT_FOUND, `No taajil-student found by id: ${studentId}`);
  }

  // Delete/remove taajil from the student
  await deleteTaajilByStudentId(studentId);

  // Let's send the student that taajil was removed from him/her
  return await Student.findOne({ where: { id: studentId } });
};

const findTaajilByStudentId = async (studentId) => {
  return await Taajil.findOne({
    where: {
      studentId,
    },
  });
};

// Delete a taajil
module.exports = {
  createTaajil,
  taajilStudents,
  deleteTaajil,
  deleteTaajilByStudentId,
};
