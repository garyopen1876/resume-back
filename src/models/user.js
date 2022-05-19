'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // define association here
      Users.hasMany(models.Messages, { foreignKey: 'owner' });
    }
  }
  Users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    mail: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};