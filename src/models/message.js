'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    static associate(models) {
      // define association here
      Messages.belongsTo(models.Users,{ foreignKey: 'id'});
    }
  }
  Messages.init({
    owner: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Messages',
  });
  return Messages;
};