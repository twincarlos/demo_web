'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Order_Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      itemName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      itemDescription: {
        type: Sequelize.TEXT
      },
      itemPrice: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      itemQuantity: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Order_Items');
  }
};