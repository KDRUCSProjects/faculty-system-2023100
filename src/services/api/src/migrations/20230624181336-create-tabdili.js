const BaseModel = require('../models/basemodel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tabdilis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      studentId: {
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
      year: {
        type: Sequelize.INTEGER,
        required: true,
      },
      semesterId: {
        type: Sequelize.INTEGER,
        trim: true,
        required: true,
        references: {
          model: 'Semesters',
          key: 'id',
        },
      },
      regNumber: {
        type: Sequelize.INTEGER,
      },
      attachment: {
        type: Sequelize.STRING,
      },
      notes: {
        type: Sequelize.STRING,
      },
      ...BaseModel(Sequelize),
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tabdilis');
  },
};
