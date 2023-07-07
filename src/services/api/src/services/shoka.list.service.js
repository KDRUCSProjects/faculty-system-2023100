// Sequelize Models
const { QueryTypes } = require('sequelize');
const { ShokaList, sequelize } = require('../models');

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
 * find Student if he has gotten marks in same subject
 * @param {ObjectId} shokaId
 * @param {ObjectId} studentId
 * @returns {Promise<ShokaList>}
 */
const isStudentListedInShokaList = (shokaId, studentId) => {
  return ShokaList.findOne({
    where: { shokaId, studentId },
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
    shokalist.assignmentOrProjectMarks,
    shokalist.finalMarks,
    shokalist.createdAt,
    shokalist.deletedAt,
    shoka.id as shokaId, 
    shoka.subjectId,
    subject.name as subjectName,
    subject.semesterId as semesterId,
    semester.title as semesterTitle,
    semester.educationalYearId as educationalYearId,
    educationalYear.year as educationaYear
    from shokalists as shokalist
    inner join shokas as shoka on shoka.id = shokalist.shokaId
    inner join subjects as subject on subject.id = shoka.subjectId
    inner join semesters as semester on semester.id = subject.semesterId
    inner join educationalYears as educationalYear on educationalYear.id = semester.educationalYearId 
    where ${conditions.join(` AND `)}`,
    { type: QueryTypes.SELECT }
  );
};

module.exports = {
  getShokaList,
  createShokaList,
  getStudentMarks,
  isStudentListedInShokaList,
};
