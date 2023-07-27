const { Sequelize } = require('sequelize');
const axios = require('axios');
const { User } = require('../models');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  showConnectionStatus(sequelize);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
  showConnectionStatus(sequelize);
}

const setupWizardMiddleware = async (req, res, next) => {
  try {
    // Check if the users table is empty
    const usersCount = await User.count();

    // Check if the database is fully empty
    const tables = await sequelize.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = '${sequelize.config.database}'`
    );
    const nonEmptyTables = [];
    for (const table of tables[0]) {
      const [result] = await sequelize.query(`SELECT COUNT(*) as count FROM ${table.table_name}`);
      if (result.count > 0) {
        nonEmptyTables.push(table.table_name);
      }
    }

    // Allow access to the setup_wizard endpoint
    if (usersCount == 0 || nonEmptyTables.length == 0) {
      const data = {
        accounts: [
          {
            name: 'fake name',
            email: 'fake@example.com',
            password: 'password1',
            role: 'user',
          },
          {
            name: 'fake name',
            email: 'fake@example.com',
            password: 'password1',
            role: 'user',
          },
          {
            name: 'fake name',
            email: 'fake@example.com',
            password: 'password1',
            role: 'user',
          },
        ],
        currentEducationalYear: 2019,
      };

      axios
        .post('/first_users', data, {})
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      next();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = {
  setupWizardMiddleware,
};
