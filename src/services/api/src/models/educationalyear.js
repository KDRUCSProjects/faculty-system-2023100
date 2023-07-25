const { Model } = require('sequelize');
const BaseModel = require('./basemodel');

module.exports = (sequelize, DataTypes) => {
  class EducationalYear extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Semester);
      this.hasMany(models.Student);
    }
  }
  EducationalYear.init(
    {
      // Current on-going period of students: (e.g 6th currently)
      period: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: true,
      },
      year: {
        // This is similar to kankor Year or current educational year
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      onGoing: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      firstHalf: {
        // The first semester of the class (make this true if it's currently on-going)
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      secondHalf: {
        // The second semester of the class (make this true if it's currently on-going)
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      // Most classes starting semester and ending semester vary from dates. E.X:
      // 1st semester start date: 1399 and end date: 1400
      firstHalfStart: {
        // The actual start date of first semester (shamsi maybe)
        type: DataTypes.INTEGER,
      },
      firstHalfEnd: {
        // The actual end date of first semester (shamsi maybe)
        type: DataTypes.INTEGER,
      },
      SecondHalfStart: {
        // The actual start date of second semester (shamsi maybe)
        type: DataTypes.INTEGER,
      },
      SecondHalfEnd: {
        // The actual start date of second semester (shamsi maybe)
        type: DataTypes.INTEGER,
      },
      ...BaseModel(DataTypes),
    },
    {
      sequelize,
      modelName: 'EducationalYear',
      paranoid: true,
      timestamps: true,
    }
  );
  return EducationalYear;
};
