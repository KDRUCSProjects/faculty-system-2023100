const { Model } = require('sequelize');
const BaseModel = require('./basemodel');

module.exports = (sequelize, DataTypes) => {
  class Taajil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static async studentAlreadyHaveTaajil(studentId) {
      const student = await this.findOne({ where: { studentId } });

      return !!student;
    }

    static associate(models) {
      // define association here
      this.belongsTo(models.Student, { foreignKey: 'studentId', as: 'Student' });
    }
  }
  Taajil.init(
    {
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
      year: {
        type: DataTypes.INTEGER,
        required: true,
      },
      semesterId: {
        type: DataTypes.INTEGER,
        required: true,
        references: {
          model: 'Semester',
          key: 'id',
        },
      },
      type: {
        type: DataTypes.ENUM('taajil', 'special_taajil'),
        defaultValue: 'taajil',
        required: true,
      },
      regNumber: DataTypes.INTEGER,
      attachment: DataTypes.STRING,
      notes: DataTypes.STRING,
      onGoing: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      ...BaseModel(DataTypes),
    },
    {
      sequelize,
      modelName: 'Taajil',
      timestamps: true,
    }
  );
  return Taajil;
};
