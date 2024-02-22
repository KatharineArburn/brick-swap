'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lego extends Model {
    static associate(models) {
      Lego.belongsTo(models.User, {foreignKey: 'userId'});
      Lego.hasMany(models.Wishlist, {foreignKey: 'legoId'})
      Lego.hasMany(models.Tag, {foreignKey: 'legoId'});
    }
  }
  Lego.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    itemNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    pieces: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        // isNumeric: true,
        notEmpty: true
      }
    },
    ages: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    theme: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Lego',
  });
  return Lego;
};
