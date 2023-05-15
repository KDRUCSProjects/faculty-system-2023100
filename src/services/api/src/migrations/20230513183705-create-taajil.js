/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Taajils', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      student: {
        type: Sequelize.STRING,
        required: true,
        trim: true,
      },
      term: {
        type: Sequelize.STRING,
        required: true,
        trim: true,
      },
      startDate: {
        type: Sequelize.STRING,
        required: true,
        trim: true,
      },
      EndDate: {
        type: Sequelize.STRING,
        required: true,
        trim: true,
      },
      year: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Taajils');
  },
};
