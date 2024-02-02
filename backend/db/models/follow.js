'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    static associate(models) {
      Follow.belongsTo(models.User, {foreignKey: 'followingUserId'})
      Follow.belongsTo(models.User, {foreignKey: 'followedUserId'})
    }
  }
  Follow.init({
    followingUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    followedUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Follow',
  });
  return Follow;
};
