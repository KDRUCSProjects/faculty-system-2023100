const BaseModel = require('../models/basemodel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Semesters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.INTEGER,
        required: true,
      },
      educationalYearId: {
        type: Sequelize.INTEGER,
        required: true,
      },
      totalWeeks: {
        type: Sequelize.INTEGER,
        defaultValue: 16,
        required: true,
      },
      monthStart: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        required: true,
      },
      monthEnd: {
        type: Sequelize.INTEGER,
        defaultValue: 3,
        required: true,
      },
      attendancePercentage: {
        type: Sequelize.INTEGER,
        defaultValue: 25,
        required: true,
      },
      completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      ...BaseModel(Sequelize),
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Semesters');
  },
};
