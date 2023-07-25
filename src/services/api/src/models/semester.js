const { Model } = require('sequelize');
const BaseModel = require('./basemodel');

module.exports = (sequelize, DataTypes) => {
  class Semester extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.EducationalYear, { foreignKey: 'educationalYearId', as: 'EducationalYear' });
      this.hasMany(models.Subject);
      this.hasMany(models.StudentsList);
    }
  }
  Semester.init(
    {
      title: DataTypes.INTEGER,
      educationalYearId: {
        type: DataTypes.INTEGER,
        required: true,
        references: {
          model: 'EducationalYear',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      ...BaseModel(DataTypes),
    },
    {
      sequelize,
      modelName: 'Semester',
      paranoid: true,
      timestamps: true,
    }
  );
  return Semester;
};
