const faker = require('faker');

const subjects = [...Array(48)].map((re) => {
  return {
    semesterId: faker.datatype.number({ min: 1, max: 3 }),
    name: faker.name.firstName(),
    teacherId: faker.datatype.number({ min: 1, max: 10 }),
  };
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('subjects', subjects, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('subjects', null, {});
  },
};
