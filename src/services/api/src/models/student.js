const { Model } = require('sequelize');
const BaseModel = require('./basemodel');

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.EducationalYear, { foreignKey: 'educationalYearId', as: 'EducationalYear' });
    }
  }
  Student.init(
    {
      kankorId: DataTypes.STRING,
      fullName: DataTypes.STRING,
      nickName: DataTypes.STRING,
      fatherName: DataTypes.STRING,
      grandFatherName: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      province: DataTypes.STRING,
      division: DataTypes.STRING,
      district: DataTypes.STRING,
      engName: DataTypes.STRING,
      engFatherName: DataTypes.STRING,
      engGrandFatherName: DataTypes.STRING,
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
      admissionYear: DataTypes.DATE,
      ...BaseModel(DataTypes),
    },
    {
      sequelize,
      modelName: 'Student',
    }
  );
  return Student;
};
