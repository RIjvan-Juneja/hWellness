'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medication extends Model {
    static associate(models) {
      Medication.belongsTo(models.User, { foreignKey: 'user_id' });
      Medication.hasMany(models.MedicationLog, { foreignKey: 'medication_id' });
      Medication.hasMany(models.EmailNotification, { foreignKey: 'medication_id' });
    }
  }
  Medication.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    file_path: DataTypes.STRING,
    type: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    time: DataTypes.TIME,
    recurrence: DataTypes.STRING,
    day_of_week: DataTypes.STRING,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Medication',
    timestamps: false
  });
  return Medication;
};
