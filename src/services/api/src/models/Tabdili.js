const { Model } = require('sequelize');
const BaseModel = require('./basemodel');

module.exports = (sequelize, DataTypes) => {
  class Tabdili extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Student, { foreignKey: 'studentId', as: 'Student' });
    }
  }
  Tabdili.init(
    {
      studentId: {
        type: DataTypes.INTEGER,
        required: true,
        trim: true,
        references: {
          model: 'Student',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      educationalYearId: {
        type: DataTypes.INTEGER,
        required: true,
        trim: true,
        references: {
          model: 'EducationalYears',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      semesterId: {
        type: DataTypes.INTEGER,
        required: true,
        references: {
          model: 'Semester',
          key: 'id',
        },
      },
      regNumber: DataTypes.INTEGER,
      attachment: DataTypes.STRING,
      notes: DataTypes.STRING,
      ...BaseModel(DataTypes),
    },
    {
      sequelize,
      modelName: 'Tabdili',
    }
  );
  return Tabdili;
};
