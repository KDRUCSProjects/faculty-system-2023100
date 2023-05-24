module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'departments',
      [
        {
          name: 'Software Engineering',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Database',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Networking',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('departments', null, {});
  },
};
