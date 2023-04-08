'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: {
      allowNull: false,
      type: DataTypes.STRING
    },
    userFirstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    userLastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    userEmail: {
      allowNull: false,
      type: DataTypes.STRING
    },
    userPhoneNumber: {
      allowNull: false,
      type: DataTypes.STRING
    },
    confirmationNumber: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    netTotal: {
      allowNull: false,
      type: DataTypes.FLOAT
    }
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    Order.hasMany(models.Order_Item, { as: 'orderItems', foreignKey: 'orderId' });
  };
  return Order;
};