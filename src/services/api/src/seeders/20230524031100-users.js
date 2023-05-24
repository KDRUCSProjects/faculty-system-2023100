const faker = require('faker');

const roles = ['admin', 'teacher', 'student'];

const users = [...Array(10)].map((user) => {
  return {
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: roles[faker.datatype.number({ min: 0, max: 2 })],
  };
});
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
