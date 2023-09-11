// Sequelize Models
const { QueryTypes } = require('sequelize');
const httpStatus = require('http-status');
const { ShokaList, sequelize, Student, Subject, Shoka, StudentsList } = require('../models');
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
    shokalist.projectMarks,
    shokalist.assignment,
    shokalist.practicalWork,
    shokalist.chance,
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
    educationalYear.year as educationalYear,
    educationalYear.firstHalfStart,
    educationalYear.firstHalfEnd,
    educationalYear.SecondHalfStart,
    educationalYear.SecondHalfEnd
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
 * get student marks
 * @param {Array} conditions
 * @returns {Promise<ShokaList>}
 */
const getStudentMarksSortByName = (conditions) => {
  return sequelize.query(
    `
    select 
    shokalist.id,
    shokalist.shokaId,
    shokalist.studentId,
    shokalist.projectMarks,
    shokalist.assignment,
    shokalist.practicalWork,
    shokalist.chance,
    shokalist.finalMarks,
    shokalist.createdAt,
    shokalist.deletedAt,
    shoka.id as shokaId, 
    shoka.subjectId,
    student.fullName as fullName,
    student.fatherName as fatherName,
    student.kankorId as kankorId,
    subject.name as subjectName,
    subject.semesterId as semesterId,
    subject.credit as subjectCredit,
    semester.title as semesterTitle,
    semester.educationalYearId as educationalYearId,
    educationalYear.year as educationalYear,
    educationalYear.firstHalfStart,
    educationalYear.firstHalfEnd,
    educationalYear.SecondHalfStart,
    educationalYear.SecondHalfEnd
    from shokalists as shokalist
    inner join shokas as shoka on shoka.id = shokalist.shokaId
    inner join subjects as subject on subject.id = shoka.subjectId
    inner join semesters as semester on semester.id = subject.semesterId
    inner join students as student on shokalist.studentId = student.id
    inner join educationalYears as educationalYear on educationalYear.id = semester.educationalYearId 
    where ${conditions.join(` AND `)}
    order by student.fullName
    `,
    { type: QueryTypes.SELECT }
  );
};

/**
 * get subject marks
 * @param {ObjectId} shokaId
 * @param {ObjectId} chance
 * @returns {Promise<ShokaList>}
 */
const findFailStudents = (shokaId, chance) => {
  return sequelize.query(
    `
    select
    student.fullName as fullName,
    student.fatherName as fatherName,
    student.grandFatherName as grandFatherName,
    shokalist.studentId as studentId,
    shokalist.shokaId as shokaId, 
    shokalist.projectMarks as projectMarks, 
    shokalist.assignment as assignment, 
    shokalist.finalMarks as finalMarks, 
    shokalist.practicalWork as practicalWork, 
    shokalist.chance as chance,
    (
      COALESCE(shokalist.projectMarks, 0) + COALESCE(shokalist.assignment, 0) + COALESCE(shokalist.finalMarks, 0) + COALESCE(shokalist.practicalWork, 0)
    ) as total 
    from shokalists as shokalist
    inner join students as student on student.id = shokalist.studentId
    where shokalist.chance = ${chance}
    AND shokalist.shokaId = ${shokaId}
    AND shokalist.deletedAt IS NULL
    AND (COALESCE(shokalist.projectMarks , 0) + COALESCE(shokalist.assignment  , 0) + COALESCE(shokalist.finalMarks   , 0) + COALESCE(shokalist.practicalWork   , 0)) < 55;
   `,
    { type: QueryTypes.SELECT }
  );
};

/**
 * get subject marks
 * @param {ObjectId} semesterId
 * @param {ObjectId} shokaId
 * @returns {Promise<ShokaList>}
 */
const getShokaMarks = (semesterId, shokaId) => {
  return sequelize.query(
    `
    select 
    student.id as studentId,
    student.fullName,
    student.fatherName,
    student.grandFatherName
    from studentslists as studentlist inner join students as student on student.id = studentlist.studentId 
    where studentlist.semesterId = ${semesterId}
    AND  student.id NOT IN (select studentId from shokalists where shokaId = ${shokaId});
    `,
    { type: QueryTypes.SELECT }
  );
  return ShokaList.findAll({
    where: { shokaId, chance },
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
 * @param {Array} conditions
 * @returns {Promise<ShokaList>}
 */
const getSubjectMarks = (conditions) => {
  return sequelize.query(
    `
    select 
    shokalist.id as shokaListId,
    shokalist.finalMarks as finalMarks,
    shokalist.assignment as assignment, 
    shokalist.practicalWork as practicalWork,
    shokalist.projectMarks as projectMarks,
    student.fullName as fullName, 
    student.kankorId as kankorId,
    student.grandFatherName as grandFatherName,
    student.photo as photo,
    student.fatherName as fatherName,
    student.id as studentId
    from shokalists as shokalist 
    inner join students as student on student.id = shokalist.studentId  
    where ${conditions.join(` AND `)}
    order by 
      student.fullName ASC,
      student.fatherName ASC
    ;
    `,
    { type: QueryTypes.SELECT }
  );
};

/**
 * find student marks by chance subject id and student id
 * @param {INTEGER} studentId
 * @param {INTEGER} shokaId
 * @param {INTEGER} chance
 * @returns {Promise<ShokaList>}
 */
const findStdMarksByChanceAndShokaId = (studentId, shokaId, chance) => {
  return ShokaList.findOne({
    where: {
      shokaId, studentId, chance
    }
  });
}


module.exports = {
  getShokaList,
  getShokaMarks,
  createShokaList,
  getStudentMarks,
  getSubjectMarks,
  updateShokaList,
  deleteShokaList,
  getShokaListById,
  findFailStudents,
  isStudentListedInShokaList,
  getStudentMarksSortByName,
  findStdMarksByChanceAndShokaId,
};
