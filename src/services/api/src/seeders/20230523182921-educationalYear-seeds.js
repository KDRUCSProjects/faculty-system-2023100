/** @type {import('sequelize-cli').Migration} */

const faker = require('faker');

let tempYear = 1390;
const years = [...Array(13)].map((element, index) => {
  return {
    period: index === 11 ? 7 : null,
    year: ++tempYear,
    createdAt: new Date(),
    updatedAt: new Date(),
    firstHalf: index === 11 ? 0 : 1,
    firstHalfStart: tempYear,
    firstHalfEnd: tempYear,
    SecondHalfStart: tempYear,
    SecondHalfEnd: tempYear,
    firstHalfStartP: index === 11 ? 2023 : tempYear,
    firstHalfEndP: index === 11 ? 2023 : tempYear,
    SecondHalfStartP: index === 11 ? 2023 : tempYear,
    SecondHalfEndP: index === 11 ? 2023 : tempYear,
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
