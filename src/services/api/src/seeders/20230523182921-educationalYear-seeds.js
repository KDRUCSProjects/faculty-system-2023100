/** @type {import('sequelize-cli').Migration} */

const faker = require('faker');

let tempYear = 1389;
const years = [...Array(13)].map((element, index) => {
  return {
    period: index === 12 ? 7 : null,
    year: ++tempYear,
    createdAt: new Date(),
    updatedAt: new Date(),
    firstHalf: index === 12 ? 1 : 0,
    firstHalfStart: index === 12 ? 1402 : null,
    firstHalfEnd: index === 12 ? 1402 : null,
    SecondHalfStart: index === 12 ? 1402 : null,
    SecondHalfEnd: index === 12 ? 1403 : null,
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
