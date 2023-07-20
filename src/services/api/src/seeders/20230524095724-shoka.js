let number = 0;

const shokas = [];
for (let index = 0; index < 46; index++) {
  shokas.push({
    subjectId: ++number,
  });
}

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('shokas', shokas, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('shokas', null, {});
  },
};
