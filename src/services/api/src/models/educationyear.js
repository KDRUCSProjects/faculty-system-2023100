'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EducationYear extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EducationYear.init({
    year: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'EducationYear',
  });
  return EducationYear;
};