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
      // enrollmentYearId: {
      //   // This is different from Kankor Year.
      //   // This is used to know when did a student actually enrolls in the faculty
      //   type: Sequelize.INTEGER,
      //   required: true,
      //   trim: true,
      //   references: {
      //     model: 'EducationalYears',
      //     key: 'id',
      //   },
      //   onDelete: 'cascade',
      //   onUpdate: 'cascade',
      // },
      ...BaseModel(DataTypes),
    },
    {
      sequelize,
      modelName: 'StudentsList',
      paranoid: true,
      timestamps: true,
    }
  );
  return StudentsList;
};
