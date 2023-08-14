const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class School extends Model {
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
  School.init(
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
      name: DataTypes.STRING,
      graduationDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'School',
    }
  );
  return School;
};
