'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.User, {foreignKey: 'senderId'})
      Message.belongsTo(models.User, {foreignKey: 'recipientId'})
      Message.hasMany(models.MessageStatus, {foreignKey: 'messageId'})
    }
  }
  Message.init({
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
