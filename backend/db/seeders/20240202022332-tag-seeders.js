'use strict';

const { Tag } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Tag.bulkCreate([
      {
        name: 'vehicles'
      },
      {
        name: 'buildings'
      },
      {
        name: 'fantasy'
      }
    ], { validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Tags';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['vehicles', 'buildings', 'fantasy'] }
    }, {});
  }
};
