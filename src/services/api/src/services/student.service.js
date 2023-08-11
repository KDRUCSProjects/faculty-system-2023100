// Sequelize Models
const { QueryTypes, Op } = require('sequelize');
const httpStatus = require('http-status');
const { Student, EducationalYear, sequelize, School, Monograph } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a student
 * @param {Object} studentBody
 * @returns {Promise<Student>}
 */
const registerStudent = (studentBody) => {
  return Student.create(studentBody);
};

/**
 * Create a Student
 * @param {Number} offset
 * @returns {Promise<Student>}
 */
const getStudents = (offset) => {
  return Student.findAndCountAll({
    order: [['createdAt', 'DESC']],
    limit: 2000,
    offset,
    include: [{ model: EducationalYear, as: 'EducationalYear', attributes: ['year'] }],
  });
};

/**
 * get students like search by student kankor id
 * @param {String} queryKankorId
 * @returns {Promise<Student>}
 */
const getStudentByKankorId = (queryKankorId, limit, offset) => {
  return Student.findAndCountAll({
    where: {
      kankorId: {
        [Op.like]: `${queryKankorId || ''}%`,
      },
    },
    limit,
    offset,
    order: [['createdAt', 'DESC']],
    include: [{ model: EducationalYear, as: 'EducationalYear', attributes: ['year'] }],
  });
};

/**
 * Create a Student
 * @param {Object} oldStudent
 * @param {Object} newStudent
 * @returns {Promise<Student>}
 */
const updateStudent = (oldStudent, newStudent) => {
  if (oldStudent instanceof Student) {
    oldStudent.set({
      ...oldStudent,
      ...newStudent,
    });
    return oldStudent.save();
  }
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
};

/**
 * delete a Student
 * @param {Object} student
 * @returns {Promise<Student>}
 */
const deleteStudent = (student) => {
  if (student instanceof Student) return student.destroy();
};

/**
 * Create a Student
 * @param {ObjectId} StudentId
 * @returns {Promise<Student>}
 */
const getStudent = (studentId) => {
  return Student.findOne({
    where: { id: studentId },
    include: [{ model: EducationalYear, as: 'EducationalYear', attributes: ['year'] }],
  });
};

/**
 * get Student On Kankor Id
 * @param {ObjectId} kankorId
 * @returns {Promise<Student>}
 */
const getStudentOnKankorId = (kankorId) => {
  return Student.findOne({ where: { kankorId } });
};

/**
 * delete Student By id
 * @param {ObjectId} studentId
 * @returns {Promise<Student>}
 */
const deleteStudentById = (studentId) => {
  return Student.destroy({ where: { id: studentId } });
};

/**
 * get unregistered Students
 * @param {Number} limit
 * @param {Number} offset
 * @returns {Promise<Student>}
 */
const getUnRegisteredStudents = (limit, offset) => {
  return sequelize.query(
    `
  select
  student.id as id,
  student.kankorId as kankorId,
  student.fullName as fullName,
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
  student.educationalYearId as educationalYearId,
  student.admissionYear as admissionYear,
  student.createdAt as createdAt,
  student.updatedAt as updatedAt,
  student.deletedAt as deletedAt,
  student.isDeleted as isDeleted,
  student.deletedBy as deletedBy
  from students as student
  where not exists (select 1 from studentslists where student.id = studentslists.studentId)
  AND student.deletedAt IS NULL
  ORDER BY student.createdAt DESC
  limit ${offset}, ${limit};
  `,
    { type: QueryTypes.SELECT }
  );
};

/**
 * count unregistered Students
 * @returns {Promise<Student>}
 */
const countUnregisteredStudent = () => {
  return sequelize.query(
    `
  select
  student.id as id,
  student.deletedAt as deletedAt,
  count(student.id) as count
  from students as student
  where not exists (select 1 from studentslists where student.id = studentslists.studentId)
  AND student.deletedAt IS NULL
  order by student.createdAt DESC;
  `,
    { type: QueryTypes.SELECT }
  );
};


/**
 * get Student school By student id
 * @param {ObjectId} studentId
 * @returns {Promise<School>}
 */
const getStudentSchool = (studentId) => {
  return School.findOne({
    where: { studentId },
    include: [
      {
        model: Student, as: 'Student'
      }
    ]
  });
};


/**
 * get Student Monograph By student id
 * @param {ObjectId} studentId
 * @returns {Promise<Monograph>}
 */
const getStudentMonograph = (studentId) => {
  return Monograph.findOne({
    where: { studentId },
    include: [
      {
        model: Student, as: 'Student'
      }
    ]
  });
};

/**
 * create Student school
 * @param {Object} schoolBody
 * @returns {Promise<School>}
 */
const createStudentSchool = (schoolBody) => {
  return School.create(schoolBody);
};

/**
 * create Student Monograph
 * @param {Object} monographBody
 * @returns {Promise<Monograph>}
 */
const createStudentMonograph = (monographBody) => {
  return Monograph.create(monographBody);
};


/**
 * find School By id
 * @param {ObjectId} schoolId
 * @returns {Promise<School>}
 */
const getSchoolById = (schoolId) => {
  return School.findOne({ where: { id: schoolId } });
};

/**
 * find Monograph By id
 * @param {ObjectId} schoolId
 * @returns {Promise<Monograph>}
 */
const getMonographById = (schoolId) => {
  return Monograph.findOne({ where: { id: schoolId } });
};

/**
 * delete a school
 * @param {Object} school
 * @returns {Promise<School>}
 */
const deleteStudentSchool = (school) => {
  if (school instanceof School) return school.destroy();
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'some thing went wrong');
};

/**
 * delete a monograph
 * @param {Object} monograph
 * @returns {Promise<School>}
 */
const deleteStudentMonograph = (monograph) => {
  if (monograph instanceof Monograph) return monograph.destroy();
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'some thing went wrong');
};


module.exports = {
  getStudent,
  getStudents,
  deleteStudent,
  updateStudent,
  registerStudent,
  deleteStudentById,
  getStudentByKankorId,
  getStudentOnKankorId,
  getUnRegisteredStudents,
  countUnregisteredStudent,
  getStudentSchool,
  getStudentMonograph,
  createStudentSchool,
  createStudentMonograph,
  getSchoolById,
  getMonographById,
  deleteStudentSchool,
  deleteStudentMonograph,
};
