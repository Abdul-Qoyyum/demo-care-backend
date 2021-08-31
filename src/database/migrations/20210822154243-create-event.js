'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;
    await queryInterface.createTable('Events', {
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
      id: DataTypes.STRING(36),
      event_type: DataTypes.STRING(50),
      care_recipient_id: DataTypes.STRING(36)
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Events');
  }
};