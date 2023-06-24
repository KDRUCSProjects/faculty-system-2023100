/** @type {import('sequelize-cli').Migration} */
const faker = require('faker');

let number = 0;
const semesters = [];
for (let index = 0; index < 8; index++) {
  semesters.push({
    title: ++number,
    educationalYearId: 12,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  });
}

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('semesters', semesters, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('semesters', null, {});
  },
};
