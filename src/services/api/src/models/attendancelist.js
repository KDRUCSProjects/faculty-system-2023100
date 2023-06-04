const { Model } = require('sequelize');
const BaseModel = require('./basemodel');

module.exports = (sequelize, DataTypes) => {
  class AttendanceList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AttendanceList.init(
    {
      subjectFK: {
        type: DataTypes.INTEGER,
        required: true,
        trim: true,
        references: {
          model: 'attendances',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      studentFK: {
        type: DataTypes.INTEGER,
        required: true,
        trim: true,
        references: {
          model: 'Students',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      isPresent: {
        type: DataTypes.BOOLEAN,
        required: true,
      },
      date: {
        type: DataTypes.DATE,
        required: true,
      },
      ...BaseModel(DataTypes),
    },
    {
      sequelize,
      modelName: 'AttendanceList',
      paranoid: true,
    }
  );
  return AttendanceList;
};
