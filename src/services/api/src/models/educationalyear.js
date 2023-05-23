const { Model } = require('sequelize');
const BaseModel = require('./basemodel');

module.exports = (sequelize, DataTypes) => {
  class EducationalYear extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Semester);
    }
  }
  EducationalYear.init(
    {
      year: DataTypes.INTEGER,
      ...BaseModel(DataTypes),
    },
    {
      sequelize,
      modelName: 'EducationalYear',
      paranoid: true,
    }
  );
  return EducationalYear;
};
