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
      this.belongsTo(models.Shoka, { foreignKey: 'shokaId', as: 'Shoka' });
      this.belongsTo(models.Student, { foreignKey: 'studentId', as: 'Student' });
    }
  }
  ShokaList.init(
    {
      shokaId: {
        type: DataTypes.INTEGER,
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
      timestamps: true,
    }
  );
  return ShokaList;
};
