const faker = require('faker');

const subjects = [...Array(48)].map((re) => {
  return {
    name: faker.name.firstName(),
    credit: faker.datatype.number({ min: 1, max: 4 }),
    semesterId: faker.datatype.number({ min: 1, max: 3 }),
    teacherId: faker.datatype.number({ min: 1, max: 3 }),
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
