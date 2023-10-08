const BaseModel = require('../models/basemodel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EducationalYears', {
      // The overall all classes that the faculty has created for students (id)
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      period: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: true,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      onGoing: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      firstHalf: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      secondHalf: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      firstHalfStart: {
        type: Sequelize.INTEGER,
      },
      firstHalfEnd: {
        type: Sequelize.INTEGER,
      },
      SecondHalfStart: {
        type: Sequelize.INTEGER,
      },
      SecondHalfEnd: {
        type: Sequelize.INTEGER,
      },
      firstHalfStartP: {
        type: Sequelize.INTEGER,
      },
      firstHalfEndP: {
        type: Sequelize.INTEGER,
      },
      SecondHalfStartP: {
        type: Sequelize.INTEGER,
      },
      SecondHalfEndP: {
        type: Sequelize.INTEGER,
      },
      ...BaseModel(Sequelize),
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EducationalYears');
  },
};
