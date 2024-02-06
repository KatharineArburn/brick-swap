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
        name: 'vehicles',
        userId: 3,
        legoId: 3
      },
      {
        name: 'buildings',
        userId: 2,
        legoId: 2
      },
      {
        name: 'fantasy',
        userId: 2,
        legoId: 2
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
