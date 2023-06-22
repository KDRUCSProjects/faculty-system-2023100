/** @type {import('sequelize-cli').Migration} */

const faker = require('faker');

let tempYear = 1389;
const years = [...Array(13)].map((element, index) => {
  return {
    year: ++tempYear,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('EducationalYears', years, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('EducationalYears', null, {});
  },
};
