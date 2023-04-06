'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    localStorageId: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Cart.associate = function(models) {
    // associations can be defined here
  };
  return Cart;
};