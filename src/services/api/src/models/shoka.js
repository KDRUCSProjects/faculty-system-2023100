const { Model } = require('sequelize');
const BaseModel = require('./basemodel');

module.exports = (sequelize, DataTypes) => {
  class Shoka extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Subject, { foreignKey: 'subjectId' });
    }
  }
  Shoka.init(
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
      ...BaseModel(DataTypes),
    },
    {
      sequelize,
      modelName: 'Shoka',
      paranoid: true,
      timestamps: true,
    }
  );
  return Shoka;
};
