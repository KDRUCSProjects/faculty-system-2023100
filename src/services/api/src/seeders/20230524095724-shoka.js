const faker = require('faker');

const shokas = [...Array(48)].map((re) => {
  return {
    subjectId: faker.datatype.number({ min: 1, max: 48 }),
  };
});

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('shokas', shokas, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('shokas', null, {});
  },
};
