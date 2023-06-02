const { Model } = require('sequelize');
const BaseModel = require('./basemodel');

module.exports = (sequelize, DataTypes) => {
  class ShokaList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ShokaList.init(
    {
      shokaFK: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
        required: true,
        trim: true,
        references: {
          model: 'Students',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      midtermMarks: DataTypes.INTEGER,
      assignmentOrProjectMarks: DataTypes.INTEGER,
      finalMarks: DataTypes.INTEGER,
      ...BaseModel(DataTypes),
    },
    {
      sequelize,
      modelName: 'ShokaList',
      paranoid: true,
    }
  );
  return ShokaList;
};
