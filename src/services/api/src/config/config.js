const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    DOCKER_ENV: Joi.string().valid('true', 'false').default(false),
    PORT: Joi.number().default(3000),
    DB_DOCKER_HOST: Joi.string().description('docker database hostname or IP'),
    DB_DOCKER_PORT: Joi.string().description('docker database port number'),
    DB_NAME: Joi.string().required().description('database name is required'),
    DB_USER: Joi.string().required().description('database username is required'),
    DB_PASS: Joi.string().required().description('database password is required'),
    DB_HOST: Joi.string().required().description('database host is required'),
    DB_PORT: Joi.string().required().description('database port number is required'),
    DB_DIALECT: Joi.string().required().description('sequelize dialect is required'),
    DB_DEV_NAME: Joi.string().required().description('development database name is required'),
    DB_DEV_USER: Joi.string().required().description('development database username is required'),
    DB_DEV_PASS: Joi.string().required().description('development database password is required'),
    DB_DEV_HOST: Joi.string().required().description('development database host is required'),
    DB_DEV_DIALECT: Joi.string().required().description('development sequelize dialect is required'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  docker: envVars.DOCKER_ENV,
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
  },
  mariadb: {
    development: {
      port: envVars.DB_DOCKER_PORT || envVars.DB_DEV_PORT,
      host: envVars.DB_DOCKER_HOST || envVars.DB_DEV_HOST,
      dialect: envVars.DB_DEV_DIALECT,
      name: envVars.DB_DEV_NAME,
      user: envVars.DB_DEV_USER,
      pass: envVars.DB_DEV_PASS,
      logging: envVars.DB_DEV_LOGS,
    },
    production: {
      port: envVars.DB_DOCKER_PORT || envVars.DB_PORT,
      host: envVars.DB_DOCKER_HOST || envVars.DB_HOST,
      dialect: envVars.DB_DIALECT,
      name: envVars.DB_NAME,
      user: envVars.DB_USER,
      pass: envVars.DB_PASS,
      logging: envVars.DB_LOGS,
    },
  },
};
