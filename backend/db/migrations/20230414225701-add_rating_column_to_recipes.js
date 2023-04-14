'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('recipes', 'userRatings', Sequelize.JSON);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('recipes', 'userRatings');
  }
};
