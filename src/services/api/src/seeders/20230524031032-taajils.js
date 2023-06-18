const faker = require('faker');

const tajils = [...Array(25)].map((re) => {
  return {
    studentId: faker.datatype.number({ min: 1, max: 100 }),
    educationalYearId: faker.datatype.number({ min: 1, max: 3 }),
    regNumber: faker.datatype.number(100),
    attachment: faker.image.imageUrl(),
    notes: faker.lorem.sentence(),
  };
});

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('taajils', tajils, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('taajils', null, {});
  },
};
