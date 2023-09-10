const BaseModel = require('../models/basemodel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      kankorId: {
        type: Sequelize.STRING,
        required: true,
      },
      fullName: {
        type: Sequelize.STRING,
        required: true,
      },
      nickName: {
        type: Sequelize.STRING,
      },
      fatherName: {
        type: Sequelize.STRING,
        required: true,
      },
      grandFatherName: {
        type: Sequelize.STRING,
        required: true,
      },
      photo: {
        type: Sequelize.STRING,
      },
      province: {
        type: Sequelize.STRING,
      },
      division: {
        type: Sequelize.STRING,
      },
      district: {
        type: Sequelize.STRING,
      },
      engName: {
        type: Sequelize.STRING,
      },
      engLastName: {
        type: Sequelize.STRING,
      },
      engFatherName: {
        type: Sequelize.STRING,
      },
      engGrandFatherName: {
        type: Sequelize.STRING,
      },
      dob: {
        type: Sequelize.DATE,
      },
      tazkeraNumber: {
        type: Sequelize.INTEGER,
      },
      birthCity: {
        type: Sequelize.STRING,
      },
      birthCountry: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      kankorMarks: {
        type: Sequelize.DOUBLE,
      },
      kankorType: {
        type: Sequelize.STRING,
      },
      birthCityEnglish: {
        type: Sequelize.STRING,
      },
      birthCountryEnglish: {
        type: Sequelize.STRING,
      },
      bankAccount: {
        type: Sequelize.STRING,
      },
      engDob: {
        type: Sequelize.DATE,
      },
      graduated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      educationalYearId: {
        type: Sequelize.INTEGER,
        required: true,
        references: {
          model: 'EducationalYears',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      admissionYear: {
        type: Sequelize.INTEGER,
      },
      csId: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.ENUM('male', 'female'),
        defaultValue: 'male',
      },
      ...BaseModel(Sequelize),
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Students');
  },
};
