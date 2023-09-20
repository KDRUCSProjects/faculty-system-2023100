const BaseModel = require('../models/basemodel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('attachments', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      attachableId: {
        type: Sequelize.INTEGER,
        required: true,
        trim: true,
      },
      photo: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.ENUM('shoka', 'attendance'),
        default: 'attendance',
      },
      ...BaseModel(Sequelize),
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('attachments');
  },
};
