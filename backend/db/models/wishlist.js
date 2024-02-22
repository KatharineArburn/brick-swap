'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    static associate(models) {
      Wishlist.belongsTo(models.User, {foreignKey: 'userId'})
      Wishlist.belongsTo(models.Lego, {foreignKey: 'legoId'})
    }
  }
  Wishlist.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    legoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Wishlist',
  });
  return Wishlist;
};
