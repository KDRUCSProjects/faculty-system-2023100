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
      imageUrl: {
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
      engFatherName: {
        type: Sequelize.STRING,
      },
      engGrandFatherName: {
        type: Sequelize.STRING,
      },
      educationalYearId: {
        type: Sequelize.INTEGER,
        required: true,
      },
      admissionYear: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Students');
  },
};
