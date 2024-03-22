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
        tag: 'vehicles',
        userId: 3,
        legoId: 3
      },
      {
        tag: 'pictures',
        userId: 1,
        legoId: 1
      },
      {
        tag: 'fantasy',
        userId: 2,
        legoId: 2
      }
    ], { validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Tags';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['vehicles', 'pictures', 'fantasy'] }
    }, {});
  }
};
