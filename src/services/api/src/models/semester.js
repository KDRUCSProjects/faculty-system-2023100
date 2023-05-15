const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Semester extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Classes, { foreignKey: 'classId', as: 'Classes' });
    }
  }
  Semester.init(
    {
      title: DataTypes.INTEGER,
      classId: {
        type: DataTypes.INTEGER,
        required: true,
        references: {
          model: 'Classes',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
    },
    {
      sequelize,
      modelName: 'Semester',
    }
  );
  return Semester;
};
