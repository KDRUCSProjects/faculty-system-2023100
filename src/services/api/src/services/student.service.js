// Sequelize Models
const { Student } = require('../models');

/**
 * Create a student
 * @param {Object} studentBody
 * @returns {Promise<User>}
 */
const registerStudent = (studentBody) => {
    return Student.create(studentBody);
};

module.exports = {
    registerStudent,
};
