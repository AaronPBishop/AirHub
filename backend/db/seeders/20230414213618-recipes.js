'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};


module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Recipes';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        brand: 'Tyson',
        item: 'Steak Fingers',
        cookTime: '8',
        cookTemp: '375',
        notes: 'Cook for an additional minute for extra crispiness',
        previewImg: ''
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Recipes';
    await queryInterface.bulkDelete(options, {}, {});
  }
};
