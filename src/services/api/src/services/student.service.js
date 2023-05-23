// Sequelize Models
const { Student } = require('../models');

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
 * @param {ObjectId} StudentId
 * @returns {Promise<Student>}
 */
const getStudents = () => {
  return Student.findAll();
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
  return Student.findOne({ where: { id: studentId } });
};

/**
 * get Student On Kankor Id
 * @param {ObjectId} kankorId
 * @returns {Promise<Student>}
 */
const getStudentOnKankorId = (kankorId) => {
  return Student.findOne({ where: { kankorId } });
};

module.exports = {
  getStudent,
  getStudents,
  deleteStudent,
  updateStudent,
  registerStudent,
  getStudentOnKankorId,
};
