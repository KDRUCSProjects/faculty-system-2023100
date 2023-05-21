/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
<<<<<<< HEAD:src/services/api/src/migrations/20230521185124-create-base-model.js
    await queryInterface.createTable('BaseModels', {
=======
    await queryInterface.createTable('Reentries', {
>>>>>>> main:src/services/api/src/migrations/20230521180139-create-reentry.js
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
<<<<<<< HEAD:src/services/api/src/migrations/20230521185124-create-base-model.js
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
=======
      studentId: {
>>>>>>> main:src/services/api/src/migrations/20230521180139-create-reentry.js
        type: Sequelize.INTEGER,
        required: true,
        trim: true,
        references: {
          model: 'Students',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      updatedBy: {
        type: Sequelize.INTEGER,
        trim: true,
        required: true,
        references: {
          model: 'EducationalYears',
          key: 'id',
        },
      },
<<<<<<< HEAD:src/services/api/src/migrations/20230521185124-create-base-model.js
      restoredAt: {
=======
      regNumber: Sequelize.INTEGER,
      attachment: Sequelize.STRING,
      notes: Sequelize.STRING,
      createdAt: {
        allowNull: false,
>>>>>>> main:src/services/api/src/migrations/20230521180139-create-reentry.js
        type: Sequelize.DATE,
      },
      deletedBy: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
<<<<<<< HEAD:src/services/api/src/migrations/20230521185124-create-base-model.js
    await queryInterface.dropTable('BaseModels');
=======
    await queryInterface.dropTable('Reentries');
>>>>>>> main:src/services/api/src/migrations/20230521180139-create-reentry.js
  },
};
