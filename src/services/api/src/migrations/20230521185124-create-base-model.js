/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BaseModels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
      },
      createdBy: {
        type: Sequelize.INTEGER,
      },
      updatedBy: {
        type: Sequelize.INTEGER,
      },
      restoredAt: {
        type: Sequelize.DATE,
      },
      deletedBy: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BaseModels');
  },
};
