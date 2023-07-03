// Sequelize Models
const httpStatus = require('http-status');
const { QueryTypes } = require('sequelize');
const { StudentsList, sequelize, Student } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * add student to a semester
 * @param {Object} listedStudentBody
 * @returns {Promise<StudentsList>}
 */
const createStudentList = (listedStudentBody) => {
  return StudentsList.create(listedStudentBody);
};

/**
 * find student in list
 * @param {ObjectId} studentId
 * @returns {Promise<StudentsList>}
 */
const findListedStudentByStudentId = (studentId) => {
  return StudentsList.findOne({ where: { studentId } });
};

/**
 * get all student list
 * @param {Number} limit
 * @param {Number} offset
 * @returns {Promise<StudentsList>}
 */
const getStudentLists = (limit, offset) => {
  return StudentsList.findAndCountAll({
    order: [['createdAt', 'DESC']],
    limit,
    offset,
    include: [{ model: Student, as: 'Student' }],
  });
};

/**
 * get student list
 * @param {ObjectId} studentListId
 * @returns {Promise<StudentsList>}
 */
const findStudentListById = (studentListId) => {
  return StudentsList.findOne({ where: { id: studentListId } });
};

/**
 * delete student list
 * @param {Object} studentListBody
 * @returns {Promise<StudentsList>}
 */
const deleteStudentList = (studentListBody) => {
  if (studentListBody instanceof StudentsList) return studentListBody.destroy();
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
};

/**
 * delete student list
 * @param {Array} queryObject
 * @param {Number} limit
 * @param {Number} offset
 * @returns {Promise<StudentsList>}
 */
const getYearAndClassStudentList = (queryArray, limit, offset) => {
  return sequelize.query(
    `
  select year.id as yearId,
  year.year as year,
  semester.id as semId, 
  semester.title as semTitle, 
  semester.educationalYearId as semEducationalYearId, 
  studentList.studentId as studentId, 
  student.id as studentId,
  student.fullName as studentFullName,
  student.kankorId as studentKankorId,
  student.NickName as studentNickName,
  student.fatherName as studentFatherName,
  student.grandFatherName as studentGrandFatherName,
  student.photo as studentPhoto,
  student.province as studentProvince,
  student.division as studentDivision,
  student.district as studentDistrict,
  student.engName as studentEngName,
  student.engLastName as studentEngLastName,
  student.engFatherName as studentEngFatherName,
  student.engGrandFatherName as studentEngGrandFatherName,
  student.dob as studentDOB,
  student.admissionYear as studentAdmissionYear,
  student.createdAt as studentCreatedAt,
  student.updatedAt as studentUpdatedAt,
  student.deletedAt as studentDeletedAt,
  student.isDeleted as studentIsDeleted,
  student.createdBy as studentCreatedBy,
  student.updatedBy as studentUpdatedBy,
  student.deletedBy as studentDeletedBy
  from educationalYears as year 
  inner join semesters as semester on semester.educationalYearId = year.id 
  inner join studentsLists as studentList on studentList.semesterId = semester.id 
  inner join students as student on student.id = studentList.studentId 
  WHERE ${queryArray.join(' AND ')}
  ORDER BY student.createdAt DESC
  limit ${offset}, ${limit};
  `,
    { type: QueryTypes.SELECT }
  );
};

/**
 * count student list
 * @param {Array} queryObject
 * @returns {Promise<StudentsList>}
 */
const countStudentList = (queryArray) => {
  return sequelize.query(
    `
  select year.id as id,
  semester.id as semId,  
  semester.educationalYearId as semEducationalYearId, 
  studentList.studentId as studentId, 
  student.id as studentId,
  student.deletedAt as deletedAt,
  count(studentList.studentId) as count
  from educationalYears as year 
  inner join semesters as semester on semester.educationalYearId = year.id 
  inner join studentsLists as studentList on studentList.semesterId = semester.id 
  inner join students as student on student.id = studentList.studentId 
  WHERE ${queryArray.join(' AND ')};
  `,
    { type: QueryTypes.SELECT }
  );
};

/**
 * find all student list of single student by student id
 * @param {ObjectId} studentId
 * @returns {Promise<StudentsList>}
 */
const findAllStudentListOfSingleStudent = (studentId) => {
  return StudentsList.findAll({
    where: { studentId },
    order: [['createdAt', 'DESC']],
  });
};

/**
 * update student list
 * @param {Object} oldStudentList
 * @param {Object} newStudentList
 * @returns {Promise<StudentsList>}
 */
const updatedStudentList = (oldStudentList, newStudentList) => {
  if (oldStudentList instanceof StudentsList) {
    oldStudentList.set({
      ...newStudentList,
    });
    return oldStudentList.save();
  }
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong please try again');
};

module.exports = {
  getStudentLists,
  countStudentList,
  createStudentList,
  deleteStudentList,
  updatedStudentList,
  findStudentListById,
  getYearAndClassStudentList,
  findListedStudentByStudentId,
  findAllStudentListOfSingleStudent,
};
