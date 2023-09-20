const { Model } = require('sequelize');
const BaseModel = require('./basemodel');

module.exports = (sequelize, DataTypes) => {
  class Attachments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  Attachments.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      attachableId: {
        type: DataTypes.INTEGER,
        required: true,
        trim: true,
      },
      photo: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.ENUM('shoka', 'attendance'),
        default: 'attendance',
      },
      ...BaseModel(DataTypes),
    },
    {
      sequelize,
      modelName: 'Attachment',
      timestamps: true,
    }
  );
  return Attachments;
};
