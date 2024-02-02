'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lego extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Lego.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    itemNumber: DataTypes.INTEGER,
    pieces: DataTypes.INTEGER,
    ages: DataTypes.STRING,
    theme: DataTypes.STRING,
    status: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lego',
  });
  return Lego;
};