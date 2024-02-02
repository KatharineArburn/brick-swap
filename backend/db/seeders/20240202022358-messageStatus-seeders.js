'use strict';

const { MessageStatus } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await MessageStatus.bulkCreate([
      {
        messageId: 1,
        userId: 3,
        isRead: true
      },
      {
        messageId: 2,
        userId: 2,
        isRead: true
      },
      {
        messageId: 3,
        userId: 1,
        isRead: false
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'MessageStatuses';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      messageId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
