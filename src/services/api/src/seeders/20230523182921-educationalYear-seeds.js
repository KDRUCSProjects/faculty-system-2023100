module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'EducationalYears',
      [
        {
          year: 2019,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          year: 2020,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          year: 2021,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('EducationalYears', null, {});
  },
};
