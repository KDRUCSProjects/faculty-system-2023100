const faker = require('faker');

// Register students who have succeed in 1401 kankorYear (educationalYearId)
// And the last two students at 1400 kankor year
const students = [...Array(15)].map((student, i) => {
  return {
    kankorId: faker.random.alphaNumeric(8),
    fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    fatherName: faker.name.firstName(),
    grandFatherName: faker.name.firstName(),
    educationalYearId: i < 13 ? 12 : 11,
    nickName: faker.name.firstName(),
    province: faker.address.city(),
    district: faker.address.state(),
    engName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    engFatherName: faker.name.firstName(),
    engGrandFatherName: faker.name.firstName(),
    kankorType: i > 12 ? 'pass14' : 'general',
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
