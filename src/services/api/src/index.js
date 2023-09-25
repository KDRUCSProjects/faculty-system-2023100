const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

// App Jobs
const { createDBBackup } = require('./jobs/backup');
const { deleteFiles } = require('./jobs/delete.files');

// Connect database
const db = require('./models/index');

// Sync tables with models
// db.sequelize.sync();

// Start server
const server = app.listen(config.port, () => {
  logger.info(`Listening at http://localhost:${config.port}`);

  // Create db backup
  createDBBackup();
  // milliseconds of single day
  const milliSeconds = 86400000;
  // call delete method once in a day
  setInterval(() => {
    deleteFiles();
  }, milliSeconds);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
