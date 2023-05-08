const { Model } = require('sequelize');

const { tokenTypes } = require('../config/tokens');

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Token.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      token: DataTypes.STRING,
      user: {
        type: DataTypes.INTEGER,
        required: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      type: {
        type: DataTypes.STRING,
        required: true,
        validate: {
          isIn: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD],
        },
      },
      expires: {
        type: DataTypes.DATE,
        required: true,
      },
      blacklisted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Token',
      timestamps: true,
    }
  );
  return Token;
};
