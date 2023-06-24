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
      this.hasMany(models.StudentsList);
    }
  }
  Student.init(
    {
      kankorId: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
        allowNull: false,
      },
      fullName: DataTypes.STRING,
      nickName: DataTypes.STRING,
      fatherName: DataTypes.STRING,
      grandFatherName: DataTypes.STRING,
      photo: DataTypes.STRING,
      province: DataTypes.STRING,
      division: DataTypes.STRING,
      district: DataTypes.STRING,
      engName: DataTypes.STRING,
      engFatherName: DataTypes.STRING,
      engGrandFatherName: DataTypes.STRING,
      dob: DataTypes.DATE,
      educationalYearId: {
        type: DataTypes.INTEGER,
        required: true,
        references: {
          model: 'EducationalYears',
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
      paranoid: true,
      timestamps: true,
    }
  );
  return Student;
};
