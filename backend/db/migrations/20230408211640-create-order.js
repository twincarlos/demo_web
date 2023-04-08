'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userFirstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userLastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userEmail: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userPhoneNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      confirmationNumber: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      netTotal: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};