const { toMysqlFormat } = require('../utils/date');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'TheAdmin',
          email: 'admin@cs.com',
          password: '$2a$08$Kf7rr0FazlKmp1Xr5SJ3SOAgafLae821r38VrV9tLJyObZ1zapBny',
          // Password: password1 (Only for development)
          role: 'admin',
          createdAt: toMysqlFormat(),
          updatedAt: toMysqlFormat(),
        },
        {
          name: 'TheExecManager',
          email: 'execManager@cs.com',
          password: '$2a$08$Kf7rr0FazlKmp1Xr5SJ3SOAgafLae821r38VrV9tLJyObZ1zapBny',
          // Password: password1 (Only for development)
          role: 'execManager',
          createdAt: toMysqlFormat(),
          updatedAt: toMysqlFormat(),
        },
        {
          name: 'TheTeachingManager',
          email: 'teachingManager@cs.com',
          password: '$2a$08$Kf7rr0FazlKmp1Xr5SJ3SOAgafLae821r38VrV9tLJyObZ1zapBny',
          // Password: password1 (Only for development)
          role: 'teachingManager',
          createdAt: toMysqlFormat(),
          updatedAt: toMysqlFormat(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
