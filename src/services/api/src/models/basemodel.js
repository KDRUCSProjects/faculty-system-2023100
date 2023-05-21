const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BaseModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BaseModel.init(
    {
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
      isDeleted: DataTypes.BOOLEAN,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
      restoredAt: DataTypes.DATE,
      deletedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'BaseModel',
    }
  );
  return BaseModel;
};
