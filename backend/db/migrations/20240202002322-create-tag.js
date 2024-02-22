'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tag0: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tag1: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tag2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tag3: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tag4: {
        type: Sequelize.STRING,
        allowNull: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: "CASCADE"
      },
      legoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Legos',
          key: 'id'
        },
        onDelete: "CASCADE"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Tags";
    await queryInterface.dropTable('Tags');
  }
};
