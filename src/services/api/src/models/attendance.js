const { Model } = require('sequelize');
const BaseModel = require('./basemodel');

module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Subject, { foreignKey: 'subjectId' });
    }
  }
  Attendance.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      subjectId: {
        type: DataTypes.INTEGER,
        required: true,
        trim: true,
        references: {
          model: 'Subject',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      ...BaseModel(DataTypes),
    },
    {
      sequelize,
      modelName: 'Attendance',
    }
  );
  return Attendance;
};
