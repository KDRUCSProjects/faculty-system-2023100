const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Taajil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
    }
  }
  Taajil.init(
    {
      SerialID: DataTypes.STRING,
      Year: DataTypes.INTEGER,
      Student: DataTypes.STRING,
      Term: DataTypes.STRING,
      StartDate: DataTypes.STRING,
      HasEnded: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Taajil',
      timestamps: true,
    }
  );
  return Taajil;
};
