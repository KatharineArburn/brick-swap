'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LegoTag extends Model {
    static associate(models) {
      // define association here
    }
  }
  LegoTag.init({
    legoId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LegoTag',
  });
  return LegoTag;
};
