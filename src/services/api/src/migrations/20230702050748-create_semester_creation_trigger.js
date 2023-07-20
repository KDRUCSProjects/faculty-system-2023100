/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.query(`
      CREATE TRIGGER semester_creation
      AFTER INSERT ON educationalYears
      FOR EACH ROW
      BEGIN
        INSERT INTO semesters (title, educationalYearId, createdAt, updatedAt)
        VALUES (1, NEW.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
               (2, NEW.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
               (3, NEW.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
               (4, NEW.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
               (5, NEW.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
               (6, NEW.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
               (7, NEW.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
               (8, NEW.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
      END;
    `);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query('DROP TRIGGER semester_creation');
  },
};
