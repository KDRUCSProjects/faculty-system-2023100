let number = 0;
const attendance = [];
for (let index = 0; index < 46; index++) {
  attendance.push({
    subjectId: ++number,
  });
}

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('attendances', attendance, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('attendances', null, {});
  },
};
