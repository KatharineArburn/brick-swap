'use strict';

const { LegoTag } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await LegoTag.bulkCreate([
      {
        legoId: 1,
        tagId: 3
      },
      {
        legoId: 2,
        tagId: 2
      },
      {
        legoId: 3,
        tagId: 1
      }
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'LegoTags';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      legoId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
