'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users' }
    }
  }, {});
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.User, { foreignKey: 'userId' });
    Cart.belongsToMany(models.Item, { through: models.Cart_Item, foreignKey: 'cartId', otherKey: 'itemId' });
  };
  return Cart;
};
