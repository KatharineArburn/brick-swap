'use strict';

const { Message } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Message.bulkCreate([
      {
        senderId: 1,
        recipientId: 3,
        message: "This set looks so fun! I would love to trade for this set!"
      },
      {
        senderId: 3,
        recipientId: 2,
        message: "Was this set hard?"
      },
      {
        senderId: 2,
        recipientId: 1,
        message: "Are all of the pieces there?"
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Messages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      senderId: { [Op.in]: [1, 3, 2] }
    }, {});
  }
};
