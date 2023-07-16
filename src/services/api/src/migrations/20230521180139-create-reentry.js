const BaseModel = require('../models/basemodel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reentries', {
      id: {
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
      educationalYearId: {
        type: Sequelize.INTEGER,
        trim: true,
        required: true,
        references: {
          model: 'EducationalYears',
          key: 'id',
        },
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
      reason: {
        type: Sequelize.ENUM('taajil', 'mahrom', 'special_taajil', 'repeat'),
        defaultValue: 'taajil',
        required: true,
      },
      regNumber: Sequelize.INTEGER,
      taajilRegNumber: Sequelize.INTEGER,
      attachment: Sequelize.STRING,
      notes: Sequelize.STRING,
      ...BaseModel(Sequelize),
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reentries');
  },
};
