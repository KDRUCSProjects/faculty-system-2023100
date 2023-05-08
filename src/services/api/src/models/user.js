const { Model } = require('sequelize');

const validator = require('validator');
const bcrypt = require('bcryptjs');
const { roles } = require('../config/roles');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    // Custom instance methods
    async isPasswordMatch(password) {
      const user = this;
      return bcrypt.compare(password, user.password);
    }

    static async isEmailTaken(email) {
      const emailExists = await this.findOne({ where: { email } });

      return !!emailExists;
    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        required: true,
        trim: true,
      },
      lastName: {
        type: DataTypes.STRING,
        trim: true,
      },
      email: {
        type: DataTypes.STRING,
        required: true,
        trim: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error('Invalid Email');
          }
        },
      },
      password: {
        type: DataTypes.STRING,
        required: true,
        trim: true,
        allowNull: false,
        validate: { min: 8 },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
        validate(value) {
          if (!roles.includes(value)) {
            throw new Error('Unknown role');
          }
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
    }
  );

  // Schema Hooks--------------------------------------------------

  User.beforeCreate('beforeUserCreation', (user) => {
    user.email = user.email.toLowerCase();
  });

  User.beforeSave(async (user) => {
    user.password = await bcrypt.hash(user.password, 8);
  });

  return User;
};
