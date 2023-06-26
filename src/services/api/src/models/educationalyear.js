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
      this.hasMany(models.Student);
    }
  }
  EducationalYear.init(
    {
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      onGoing: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      ...BaseModel(DataTypes),
    },
    {
      sequelize,
      modelName: 'EducationalYear',
      paranoid: true,
      timestamps: true,
    }
  );
  return EducationalYear;
};
