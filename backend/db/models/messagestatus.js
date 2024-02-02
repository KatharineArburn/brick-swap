'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MessageStatus extends Model {
    static associate(models) {
      MessageStatus.belongsTo(models.Message, {foreignKey: 'messageId'})
      MessageStatus.belongsTo(models.User, {foreignKey: 'userId'})
    }
  }
  MessageStatus.init({
    messageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'MessageStatus',
  });
  return MessageStatus;
};
