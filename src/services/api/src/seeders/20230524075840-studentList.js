const faker = require('faker');

let stdId = 0;
const studentLists = [];

for (let i = 1; i < 9; i++) {
  for (let j = 0; j < 10; j++) {
    ++stdId;
    studentLists.push({
      studentId: stdId,
      semesterId: i,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    });
  }
}
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('studentslists', studentLists, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('studentslists', null, {});
  },
};
