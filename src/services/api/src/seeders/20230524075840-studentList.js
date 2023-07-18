const faker = require('faker');

let stdId = 0;
const studentLists = [];

// Create students for 1401 educational year and its 1st semester
for (let j = 0; j < 10; j++) {
  ++stdId;
  studentLists.push({
    studentId: stdId,
    semesterId: 89,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  });
}
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('studentslists', studentLists, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('studentslists', null, {});
  },
};
