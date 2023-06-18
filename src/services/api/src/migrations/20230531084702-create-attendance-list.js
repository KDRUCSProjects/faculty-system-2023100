const BaseModel = require('../models/basemodel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('attendanceLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      attendanceId: {
        type: Sequelize.INTEGER,
        required: true,
        trim: true,
        references: {
          model: 'Attendances',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
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
      isPresent: {
        type: Sequelize.BOOLEAN,
        required: true,
      },
      ...BaseModel(Sequelize),
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('attendanceLists');
  },
};
