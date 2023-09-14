// Sequelize Models
const httpStatus = require('http-status');
const { QueryTypes } = require('sequelize');
const { StudentsList, sequelize, Student, Semester, EducationalYear } = require('../models');
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
  return StudentsList.findAll({ where: { studentId }, order: [['createdAt', 'DESC']] });
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
    raw: true,
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
 * get student list by student id and semester id
 * @param {ObjectId} studentId
 * @param {ObjectId} semesterId
 * @returns {Promise<StudentsList>}
 */
const getStudentListByStdIdAndSemesterId = (studentId, semesterId) => {
  return StudentsList.findOne({ where: { studentId, semesterId } });
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
  student.fullName as fullName,
  student.kankorId as kankorId,
  student.nickName as nickName,
  student.fatherName as fatherName,
  student.grandFatherName as grandFatherName,
  student.photo as photo,
  student.province as province,
  student.division as division,
  student.district as district,
  student.engName as engName,
  student.engLastName as engLastName,
  student.engFatherName as engFatherName,
  student.engGrandFatherName as engGrandFatherName,
  student.dob as dob,
  student.admissionYear as admissionYear,
  student.createdAt as createdAt,
  student.updatedAt as updatedAt,
  student.deletedAt as deletedAt,
  student.isDeleted as isDeleted,
  student.deletedBy as deletedBy
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
 * find student latest semester
 * @param {ObjectId} studentId
 * @returns {Promise<StudentsList>}
 */
const findStudentLatestSemesterId = async (studentId) => {
  const records = await StudentsList.findAll({
    where: { studentId },
    order: [['createdAt', 'DESC']],
  });

  return records[0]?.semesterId;
};

/**
 * get students by semester id
 * @param {ObjectId} studentId
 * @returns {Promise<StudentsList>}
 */
const getAllStudentsBySemesterId = async (semesterId) => {
  const records = await StudentsList.findAll({
    where: { semesterId },
    order: [['createdAt', 'DESC']],
    raw: true,
  });

  return records;
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

/**
 * find all students of the semester
 * @param {ObjectId} semesterId
 * @returns {Promise<StudentsList>}
 */
const findSemesterStudents = (semesterId) => {
  return StudentsList.findAll({
    where: { semesterId },
    include: [
      {
        model: Student,
        as: 'Student',
        attributes: ['id', 'fullName', 'fatherName', 'province', 'kankorId', 'grandFatherName', 'photo', 'csId'],
      },
    ],
    order: [[{ model: Student, as: 'Student' }, 'fullName', 'ASC']],
  });
};

/**
 * find student current semester
 * @param {ObjectId} studentId
 * @returns {Promise<StudentsList>}
 */
const findStudentCurrentSemester = (studentId) => {
  return StudentsList.findOne({
    where: { studentId, onGoing: true, completed: false },
    include: [
      {
        model: Semester,
        required: true,
        include: [
          {
            model: EducationalYear,
            as: 'EducationalYear',
            where: { onGoing: true },
            required: true,
          },
        ],
      },
    ],
  });
};

/**
 * find all students count by semester id
 * @param {ObjectId} studentId
 * @returns {Promise<StudentsList>}
 */
const getAllStudentsCountBySemesterId = async (semesterId, options = { gender: null, count: false }) => {
  const records = await StudentsList.findAll({
    where: { semesterId },
    attributes: ['studentId'],
  });

  const results = records?.map((rec) => rec.studentId);

  const query = {
    where: {
      id: results,
    },
  };
  if (options.gender) query.where.gender = options.gender;

  return options.count ? await Student.count(query) : await Student.findAll(query);
};

module.exports = {
  getStudentLists,
  countStudentList,
  createStudentList,
  deleteStudentList,
  updatedStudentList,
  findStudentListById,
  findSemesterStudents,
  getYearAndClassStudentList,
  findStudentCurrentSemester,
  findListedStudentByStudentId,
  findAllStudentListOfSingleStudent,
  getStudentListByStdIdAndSemesterId,
  findStudentLatestSemesterId,
  getAllStudentsBySemesterId,
  getAllStudentsCountBySemesterId,
};
