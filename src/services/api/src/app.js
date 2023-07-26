const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const path = require('path');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
// const { setupWizardMiddleware } = require('./middlewares/setUpWizerd');
const routes = require('./routes');
const { errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

// App Localization
const i18n = require('i18n');

/**
 * configure shared state
 */
i18n.configure({
  locales: ['en', 'ps'],
  defaultLocale: 'en',
  directory: path.join(__dirname, '/locales'),
  objectNotation: true,
});

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/auth', authLimiter);
}

// static route for images
app.use('/storage/images', express.static(path.join(__dirname, 'storage', 'images')));
// v1 api routes
app.use(routes);

// app.use(setupWizardMiddleware);
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// handle error
app.use(errorHandler);

module.exports = app;
