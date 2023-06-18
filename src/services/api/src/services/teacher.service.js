// Sequelize Models
const { User } = require('../models');

/**
 * get all Teachers
 * @returns {Promise<StudentsList>}
 */
const getTeachers = () => {
  return User.findAll({
    where: { role: 'user' },
    order: [['id', 'ASC']],
  });
};

module.exports = {
  getTeachers,
};
