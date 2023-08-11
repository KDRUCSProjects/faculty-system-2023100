'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Monograph extends Model {
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
  Monograph.init({
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
    researchTitle: DataTypes.STRING,
    defenseDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Monograph',
  });
  return Monograph;
};