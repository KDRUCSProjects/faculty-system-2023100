const { Model } = require('sequelize');
const BaseModel = require('./basemodel');

module.exports = (sequelize, DataTypes) => {
  class Reentry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    // static async studentAlreadyHaveTwoReentries(studentId) {
    //   const student = await this.findOne({ where: { studentId } }).count();

    //   return !!student;
    // }

    static associate(models) {
      // define association here
      this.belongsTo(models.Student, { foreignKey: 'studentId', as: 'Student' });
    }
  }
  Reentry.init(
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
      educationalYearId: {
        type: DataTypes.INTEGER,
        required: true,
        references: {
          model: 'EducationalYear',
          key: 'id',
        },
      },
      semesterId: {
        type: DataTypes.INTEGER,
        required: true,
        references: {
          model: 'Semester',
          key: 'id',
        },
      },
      reason: {
        type: DataTypes.ENUM('taajil', 'mahrom', 'special_taajil', 'repeat'),
        defaultValue: 'taajil',
        required: true,
      },
      regNumber: DataTypes.INTEGER,
      taajilRegNumber: DataTypes.INTEGER,
      attachment: DataTypes.STRING,
      notes: DataTypes.STRING,
      ...BaseModel(DataTypes),
    },
    {
      sequelize,
      modelName: 'Reentry',
      paranoid: true,
      timestamps: true,
    }
  );
  return Reentry;
};
