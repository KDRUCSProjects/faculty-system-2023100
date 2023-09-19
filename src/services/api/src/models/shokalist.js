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
      projectMarks: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      assignment: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      finalMarks: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      practicalWork: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      chance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 1,
          max: 4,
        },
      },
      attachment: {
        type: DataTypes.STRING,
      },
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
