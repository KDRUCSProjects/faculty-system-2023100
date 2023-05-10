const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init(
    {
      kankorId: DataTypes.STRING,
      fullname: DataTypes.STRING,
      nickname: DataTypes.STRING,
      fatherName: DataTypes.STRING,
      grandFatherName: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      province: DataTypes.STRING,
      division: DataTypes.STRING,
      district: DataTypes.STRING,
      engName: DataTypes.STRING,
      engFatherName: DataTypes.STRING,
      engGrandFatherName: DataTypes.STRING,
      educationalYear: DataTypes.DATE,
      admissionYear: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Student',
    }
  );
  return Student;
};
