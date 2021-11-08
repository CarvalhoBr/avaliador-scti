'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('workshops', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      speaker_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'speakers',
          key: 'id',
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Date.now()
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Date.now(),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('workshops');
  }
};
