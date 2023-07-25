const BaseModel = require('../models/basemodel');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ShokaLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      shokaId: {
        type: Sequelize.INTEGER,
        required: true,
        trim: true,
        references: {
          model: 'Shokas',
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
      projectMarks: {
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true,
        defaultValue: 0,
      },
      assignment: {
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true,
        defaultValue: 0,
      },
      finalMarks: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        required: true,
      },
      practicalWork: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        required: true,
      },
      chance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 1,
          max: 3,
        },
      },
      ...BaseModel(Sequelize),
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ShokaLists');
  },
};
