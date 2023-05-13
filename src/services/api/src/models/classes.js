const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.EducationalYear, { foreignKey: 'educationalYearId', as: 'EducationalYear' });
    }
  }
  Classes.init(
    {
      title: DataTypes.INTEGER,
      educationalYearId: {
        type: DataTypes.INTEGER,
        required: true,
        references: {
          model: 'EducationalYear',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
    },
    {
      sequelize,
      modelName: 'Classes',
    }
  );
  return Classes;
};
