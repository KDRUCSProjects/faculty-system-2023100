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
      this.belongsTo(models.Attendance, { foreignKey: 'attendanceId', as: 'Attendance' });
      this.belongsTo(models.Student, { foreignKey: 'studentId', as: 'Student' });
    }
  }
  AttendanceList.init(
    {
      attendanceId: {
        type: DataTypes.INTEGER,
        required: true,
        trim: true,
        references: {
          model: 'Attendances',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      studentId: {
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
      isPresentOne: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isPresentTwo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      date: {
        type: DataTypes.DATE,
        required: true,
      },
      shamsiDate: {
        type: DataTypes.DATE,
        required: true,
      },
      ...BaseModel(DataTypes),
    },
    {
      sequelize,
      modelName: 'AttendanceList',
      timestamps: true,
    }
  );
  return AttendanceList;
};
