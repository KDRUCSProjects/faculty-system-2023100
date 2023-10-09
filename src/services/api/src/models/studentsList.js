const { Model } = require('sequelize');
const BaseModel = require('./basemodel');

module.exports = (sequelize, DataTypes) => {
  class StudentsList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Student, { foreignKey: 'studentId' });
      this.belongsTo(models.Semester, { foreignKey: 'semesterId' });
    }
  }
  StudentsList.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      studentId: {
        type: DataTypes.INTEGER,
        required: true,
        trim: true,
        references: {
          model: 'Student',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      semesterId: {
        type: DataTypes.INTEGER,
        required: true,
        trim: true,
        references: {
          model: 'Semester',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      onGoing: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      ...BaseModel(DataTypes),
    },
    {
      sequelize,
      modelName: 'StudentsList',
      timestamps: true,
    }
  );
  return StudentsList;
};
