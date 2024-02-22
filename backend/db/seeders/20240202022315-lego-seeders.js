'use strict';

const { Lego } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    await Lego.bulkCreate([
      {
        userId: 1,
        name: "Retro Camera",
        itemNumber: 31147,
        pieces: 261,
        ages: "8+",
        theme: "Creator",
        status: "Available",
        image: "https://www.lego.com/cdn/cs/set/assets/blt5b4148cad80e42ea/31147.png"
      },
      {
        userId: 2,
        name: "The Madrigal House",
        itemNumber: 43202,
        pieces: 587,
        ages: "6+",
        theme: "Disney",
        status: "Available",
        image: "https://www.lego.com/cdn/cs/set/assets/blt2ca5e68542c05dd8/43202_.png"
      },
      {
        userId: 3,
        name: "John Deere 948L-II Skidder",
        itemNumber: 42157,
        pieces: 1492,
        ages: "11+",
        theme: "Technic",
        status: "Available",
        image: "https://www.lego.com/cdn/cs/set/assets/blt22d5576a8b0204ea/42157.png"
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Legos';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
