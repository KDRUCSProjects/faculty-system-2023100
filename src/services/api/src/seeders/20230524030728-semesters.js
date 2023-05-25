/** @type {import('sequelize-cli').Migration} */

const faker = require('faker');

const semesters = [...Array(24)].map((element, index) => {
  return {
    title: faker.datatype.number(8),
    educationalYearId: faker.datatype.number(3),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
});

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('semesters', semesters, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('semesters', null, {});
  },
};
