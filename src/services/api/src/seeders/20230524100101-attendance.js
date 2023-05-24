const faker = require('faker');

const attendance = [...Array(1000)].map((re) => {
  return {
    subjectId: faker.datatype.number({ min: 1, max: 48 }),
  };
});

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('attendances', attendance, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('attendances', null, {});
  },
};
