'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userId: {
      allowNull: false,
      type: DataTypes.STRING,
      references: { model: 'Users' }
    }
  }, {});
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.User, { foreignKey: 'userId' });
    Cart.belongsToMany(models.Item, { through: models.Cart_Item });
  };
  return Cart;
};
