// Sequelize Models
const { QueryTypes } = require('sequelize');
const httpStatus = require('http-status');
const { ShokaList, sequelize, Student, Subject, Shoka } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a shoka list
 * @returns {Promise<ShokaList>}
 * @param {Object} shokaListBody
 */
const createShokaList = (shokaListBody) => {
  return ShokaList.create(shokaListBody);
};

/**
 * Get Shoka List
 * @param {ObjectId} shokaId
 * @returns {Promise<ShokaList>}
 */
const getShokaList = (shokaId) => {
  return ShokaList.findAll({ where: { shokaId } });
};

/**
 * Get Shoka List by id
 * @param {ObjectId} shokaListId
 * @returns {Promise<ShokaList>}
 */
const getShokaListById = (shokaListId) => {
  return ShokaList.findOne({ where: { id: shokaListId } });
};

/**
 * delete a shoka list
 * @param {Object} shokalist
 * @returns {Promise<Subject>}
 */
const deleteShokaList = (shokaList) => {
  if (shokaList instanceof ShokaList) {
    return shokaList.destroy();
  }
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong please try again');
};

/**
 * update shoka list
 * @param {Object} oldShokaListBody
 * @param {Object} newShokaListBody
 * @returns {Promise<ShokaList>}
 */
const updateShokaList = (oldShokaListBody, newShokaListBody) => {
  if (oldShokaListBody instanceof ShokaList) {
    oldShokaListBody.set({
      ...newShokaListBody,
    });
    return oldShokaListBody.save();
  }
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
};

/**
 * find Student if he has gotten marks in same subject
 * @param {ObjectId} shokaId
 * @param {ObjectId} studentId
 * @param {Number} chance
 * @returns {Promise<ShokaList>}
 */
const isStudentListedInShokaList = (shokaId, studentId, chance) => {
  return ShokaList.findOne({
    where: { shokaId, studentId, chance },
  });
};

/**
 * get student marks
 * @param {Array} conditions
 * @returns {Promise<ShokaList>}
 */
const getStudentMarks = (conditions) => {
  return sequelize.query(
    `
    select 
    shokalist.id,
    shokalist.shokaId,
    shokalist.studentId,
    shokalist.midtermMarks,
    shokalist.assignment,
    shokalist.practicalWork,
    shokalist.finalMarks,
    shokalist.createdAt,
    shokalist.deletedAt,
    shoka.id as shokaId, 
    shoka.subjectId,
    subject.name as subjectName,
    subject.semesterId as semesterId,
    subject.credit as subjectCredit,
    semester.title as semesterTitle,
    semester.educationalYearId as educationalYearId,
    educationalYear.year as educationalYear
    from shokalists as shokalist
    inner join shokas as shoka on shoka.id = shokalist.shokaId
    inner join subjects as subject on subject.id = shoka.subjectId
    inner join semesters as semester on semester.id = subject.semesterId
    inner join educationalYears as educationalYear on educationalYear.id = semester.educationalYearId 
    where ${conditions.join(` AND `)}
    `,
    { type: QueryTypes.SELECT }
  );
};

/**
 * get subject marks
 * @param {ObjectId} shokaId
 * @returns {Promise<ShokaList>}
 */
const getShokaMarks = (shokaId) => {
  return ShokaList.findAll({
    where: { shokaId },
    include: [
      { model: Student, as: 'Student' },
      {
        model: Shoka,
        as: 'Shoka',
        include: [{ model: Subject }],
      },
    ],
  });
};

/**
 * get subject marks
 * @param {Number} shokaId
 * @returns {Promise<ShokaList>}
 */
const getSubjectMarks = (shokaId) => {
  return sequelize.query(
    `
    select shokalist.finalMarks as finalMarks, 
    shokalist.midtermMarks as midterm,
    shokalist.assignment as assignment, 
    shokalist.practicalWork as practicalWork,
    student.fullName as fullName, 
    student.fatherName as fatherName 
    from shokalists as shokalist 
    inner join students as student on student.id = shokalist.studentId  
    where shokaId = ${shokaId}
    order by 
      student.fullName ASC,
      student.fatherName ASC
    ;
    `,
    { type: QueryTypes.SELECT }
  );
};
module.exports = {
  getShokaList,
  getShokaMarks,
  createShokaList,
  getStudentMarks,
  getSubjectMarks,
  updateShokaList,
  deleteShokaList,
  getShokaListById,
  isStudentListedInShokaList,
};
