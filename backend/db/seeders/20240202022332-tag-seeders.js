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
        tag0: 'vehicles',
        tag1: 'John Deer',
        tag2: null,
        tag3: null,
        tag4: null,
        userId: 3,
        legoId: 3
      },
      {
        tag0: 'pictures',
        tag1: 'Old School',
        tag2: 'polaroid',
        tag3: null,
        tag4: null,
        userId: 1,
        legoId: 1
      },
      {
        tag0: 'fantasy',
        tag1: 'buildings',
        tag2: 'Disney',
        tag3: null,
        tag4: null,
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
