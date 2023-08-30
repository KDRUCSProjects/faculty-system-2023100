const BaseModel = require('../models/basemodel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subjects', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        required: true,
        trim: true,
      },
      credit: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false,
      },
      codeNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      semesterId: {
        type: Sequelize.INTEGER,
        required: true,
        trim: true,
        references: {
          model: 'Semesters',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      teacherId: {
        type: Sequelize.INTEGER,
        trim: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      ...BaseModel(Sequelize),
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Subjects');
  },
};
