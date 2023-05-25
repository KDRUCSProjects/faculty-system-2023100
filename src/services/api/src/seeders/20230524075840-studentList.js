const faker = require('faker');

const studentLists = [...Array(25)].map((re) => {
  return {
    studentId: faker.datatype.number({ min: 1, max: 100 }),
    semesterId: faker.datatype.number({ min: 1, max: 3 }),
  };
});

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('studentslists', studentLists, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('studentslists', null, {});
  },
};
