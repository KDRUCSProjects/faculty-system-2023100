const { Model } = require('sequelize');
const BaseModel = require('./basemodel');

module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static async departmentNameIsTaken(name) {
      const department = await this.findOne({ where: { name } });

      return !!department;
    }

    static associate(models) {
      // define association here
    }
  }
  Department.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      ...BaseModel(DataTypes),
    },
    {
      sequelize,
      modelName: 'Department',
      paranoid: true,
      timestamps: true,
    }
  );
  return Department;
};
