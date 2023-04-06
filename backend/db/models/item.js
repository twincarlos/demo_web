'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    price: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    stock: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsToMany(models.Cart, { through: models.Cart_Item });
  };
  return Item;
};
