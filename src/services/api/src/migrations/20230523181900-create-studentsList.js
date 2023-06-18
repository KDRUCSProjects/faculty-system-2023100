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
      // enrollmentYearId: {
      //   // This is different from Kankor Year.
      //   // This is used to know when did a student actually enrolls in the faculty
      //   type: Sequelize.INTEGER,
      //   required: true,
      //   trim: true,
      //   references: {
      //     model: 'EducationalYears',
      //     key: 'id',
      //   },
      //   onDelete: 'cascade',
      //   onUpdate: 'cascade',
      // },
      ...BaseModel(Sequelize),
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StudentsLists');
  },
};
