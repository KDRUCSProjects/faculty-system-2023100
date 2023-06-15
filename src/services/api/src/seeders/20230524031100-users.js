const faker = require('faker');

const users = [...Array(3)].map((user) => {
  return {
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: '$2a$08$Kf7rr0FazlKmp1Xr5SJ3SOAgafLae821r38VrV9tLJyObZ1zapBny',
    photo: faker.image.imageUrl(),
    role: 'user',
  };
});
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
