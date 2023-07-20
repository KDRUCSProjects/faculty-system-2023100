const faker = require('faker');

const students = [...Array(100)].map((student) => {
  return {
    kankorId: faker.random.alphaNumeric(8),
    fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    fatherName: faker.name.firstName(),
    grandFatherName: faker.name.firstName(),
    educationalYearId: 12,
    nickName: faker.name.firstName(),
    province: faker.address.city(),
    district: faker.address.state(),
    engName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    engFatherName: faker.name.firstName(),
    engGrandFatherName: faker.name.firstName(),
    createdAt: new Date(),
    updatedAt: new Date(),
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
