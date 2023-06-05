const BaseModel = require('../models/basemodel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        required: true,
        trim: true,
      },
      lastName: {
        type: Sequelize.STRING,
        trim: true,
      },
      email: {
        type: Sequelize.STRING,
        required: true,
      },
      photo: Sequelize.STRING,
      password: {
        type: Sequelize.STRING,
        required: true,
        trim: true,
        allowNull: false,
        validate: { min: 8 },
      },
      role: {
        type: Sequelize.STRING,
        required: true,
      },
      ...BaseModel(Sequelize),
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
