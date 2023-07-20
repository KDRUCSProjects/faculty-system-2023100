const BaseModel = require('../models/basemodel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StudentsLists', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
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
      completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      onGoing: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      ...BaseModel(Sequelize),
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StudentsLists');
  },
};
