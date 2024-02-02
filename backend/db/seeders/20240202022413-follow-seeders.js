'use strict';

const { Follow } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Follow.bulkCreate([
      {
        followingUserId: 3,
        followedUserId: 1
      },
      {
        followingUserId: 2,
        followedUserId: 3
      },
      {
        followingUserId: 1,
        followedUserId: 2
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Follows';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      followingUserId: { [Op.in]: [3, 2, 1] }
    }, {});
  }
};
