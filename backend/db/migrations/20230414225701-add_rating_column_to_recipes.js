'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
options.tableName = 'Recipes';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; 
};

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(options, 'userRatings', Sequelize.JSON);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(options, 'userRatings');
  }
};
