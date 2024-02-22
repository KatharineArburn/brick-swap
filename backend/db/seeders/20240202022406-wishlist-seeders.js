'use strict';

const { Wishlist } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Wishlist.bulkCreate([
      {
        userId: 1,
        legoId: 3
      },
      {
        userId: 2,
        legoId: 3
      },
      {
        userId: 3,
        legoId: 1
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Wishlists';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
