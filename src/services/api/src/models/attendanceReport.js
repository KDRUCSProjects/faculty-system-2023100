const { Model } = require('sequelize');
const BaseModel = require('./basemodel');

module.exports = (sequelize, DataTypes) => {
  class AttendanceReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Subject, { foreignKey: 'subjectId', as: 'subject' });
    }
  }
  AttendanceReport.init(
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
          model: 'Subjects',
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
      month: {
        type: DataTypes.INTEGER,
        default: 0,
      },
      present: {
        type: DataTypes.INTEGER,
        default: 0,
      },
      absent: {
        type: DataTypes.INTEGER,
        default: 0,
      },
      ...BaseModel(DataTypes),
    },
    {
      sequelize,
      modelName: 'AttendanceReport',
      paranoid: true,
      timestamps: true,
    }
  );
  return AttendanceReport;
};
