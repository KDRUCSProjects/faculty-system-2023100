const faker = require('faker');

let stdId = 80;
const tajils = [];

for (let j = 0; j < 5; j++) {
  ++stdId;
  tajils.push({
    studentId: stdId,
    educationalYearId: 12,
    regNumber: faker.datatype.number(100),
    attachment: faker.image.imageUrl(),
    notes: faker.lorem.sentence(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  });
}

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('taajils', tajils, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('taajils', null, {});
  },
};
