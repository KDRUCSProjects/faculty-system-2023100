const BaseModel = require('../models/basemodel');

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
      type: {
        type: Sequelize.ENUM('taajil', 'special_taajil'),
        defaultValue: 'taajil',
        required: true,
      },
      regNumber: Sequelize.INTEGER,
      attachment: Sequelize.STRING,
      notes: Sequelize.STRING,
      onGoing: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      ...BaseModel(Sequelize),
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Taajils');
  },
};
