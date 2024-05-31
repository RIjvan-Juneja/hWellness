'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {
      Session.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Session.init({
    user_id: DataTypes.INTEGER,
    device_info: DataTypes.STRING,
    loggin_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    is_logged:{
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Session',
    timestamps: false
  });
  return Session;
};
