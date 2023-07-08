const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TempToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TempToken.init(
    {
      token: {
        type: DataTypes.INTEGER,
        required: true,
      },
      expiresIn: {
        type: DataTypes.DATE,
        required: true,
      },
    },
    {
      sequelize,
      modelName: 'TempToken',
    }
  );
  return TempToken;
};
