'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order_Item = sequelize.define('Order_Item', {
    orderId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    itemName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    itemDescription: {
      type: DataTypes.TEXT
    },
    itemPrice: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    itemQuantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    netTotal: {
      allowNull: false,
      type: DataTypes.FLOAT
    }
  }, {});
  Order_Item.associate = function(models) {
    // associations can be defined here
    Order_Item.belongsTo(models.Order, { foreignKey: 'orderId' });
  };
  return Order_Item;
};