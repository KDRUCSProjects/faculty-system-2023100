/**
 * To use This is Model You need import this function in each Model and Migration files and
 * give the sequelize object in parameter
 * where the sequelize object is Datatypes in Model files and
 * and the sequelize object is Sequelize in migration files
 * and use spread operator where you use this functions
 * @example {...BaseModel(DataTypes)}
 * @param {Sequelize} sequelize
 * @returns {Object<BaseModel}
 */

const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  const BaseModel = {
    createdAt: sequelize.DATE,
    updatedAt: sequelize.DATE,
    deletedAt: sequelize.DATE,
    isDeleted: {
      type: sequelize.BOOLEAN,
      defaultValue: false,
    },
    // createdBy: sequelize.INTEGER,
    // updatedBy: sequelize.INTEGER,
    deletedBy: sequelize.INTEGER,
  };
  return BaseModel;
};
