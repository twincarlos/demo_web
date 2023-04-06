'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart_Item = sequelize.define('Cart_Item', {
    cartId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Carts' }
    },
    itemId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Items' }
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Cart_Item.associate = function(models) {
    // associations can be defined here
  };
  return Cart_Item;
};
