// Sequelize Models
const { QueryTypes } = require('sequelize');
const { Student, EducationalYear, sequelize } = require('../models');

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
    limit: 10,
    offset,
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
};

/**
 * Create a Student
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
 * @param {ObjectId} limit
 * @param {ObjectId} offset
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

module.exports = {
  getStudent,
  getStudents,
  deleteStudent,
  updateStudent,
  registerStudent,
  deleteStudentById,
  getStudentOnKankorId,
  getUnRegisteredStudents,
  countUnregisteredStudent,
};
