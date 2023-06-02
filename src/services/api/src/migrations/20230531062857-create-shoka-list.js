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
      shokaFK: {
        type: Sequelize.INTEGER,
        required: true,
        trim: true,
        references: {
          model: 'Subjects',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      studentFK: {
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
      midtermMarks: {
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true,
      },
      assignmentOrProjectMarks: {
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true,
      },
      finalMarks: {
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true,
      },
      ...BaseModel(Sequelize),
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ShokaLists');
  },
};
