const faker = require('faker');

const students = [...Array(100)].map((student) => {
  return {
    kankorId: faker.random.alphaNumeric(8),
    fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    fatherName: faker.name.firstName(),
    grandFatherName: faker.name.firstName(),
    educationalYearId: faker.datatype.number(10),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
});
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('students', students, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('students', null, {});
  },
};
