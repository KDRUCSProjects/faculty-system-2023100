const { Model } = require('sequelize');
const BaseModel = require('./basemodel');

module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Semester, { foreignKey: 'semesterId' });
    }
  }
  Subject.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        required: true,
        trim: true,
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
      teacherId: {
        type: DataTypes.INTEGER,
        trim: true,
        references: {
          model: 'User',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      ...BaseModel(DataTypes),
    },
    {
      sequelize,
      modelName: 'Subject',
    }
  );
  return Subject;
};
