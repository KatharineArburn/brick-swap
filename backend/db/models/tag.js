'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.belongsTo( models.User,{foreignKey:'userId'});
      Tag.belongsTo( models.Lego,{foreignKey:'legoId'});
    }
  }
  Tag.init({
    tag0: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    tag1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tag2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tag3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tag4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    legoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};
