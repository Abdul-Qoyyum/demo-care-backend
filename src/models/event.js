'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Event.init({
      payload: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      alert_id: DataTypes.STRING(36),
      task_instance_id: DataTypes.STRING(255),
      visit_id: DataTypes.STRING(36),
      caregiver_id: DataTypes.STRING(36),
      payload_as_text: DataTypes.TEXT,
      rejected_event_id: DataTypes.STRING(255),
      observation_event_id: DataTypes.STRING(255),
      timestamp: DataTypes.DATE,
      id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
      },
      event_type: DataTypes.STRING(50),
      care_recipient_id: DataTypes.STRING(36)
    },
    {
      sequelize,
      modelName: "Event",
      tableName: "events",
      createdAt: "timestamp",
      underscore: true,
      updatedAt: false,
    }
  );

  return Event;
};
