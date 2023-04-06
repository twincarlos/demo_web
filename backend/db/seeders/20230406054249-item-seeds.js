'use strict';

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Items';
    return queryInterface.bulkInsert(options, [
      {
        name: 'Item1',
        price: 0.99,
        stock: 10
      },
      {
        name: 'Item2',
        price: 1.99,
        stock: 10
      },
      {
        name: 'Item3',
        price: 2.99,
        stock: 10
      },
      {
        name: 'Item4',
        price: 3.99,
        stock: 10
      },
      {
        name: 'Item5',
        price: 4.99,
        stock: 10
      },
      {
        name: 'Item6',
        price: 5.99,
        stock: 10
      },
      {
        name: 'Item7',
        price: 6.99,
        stock: 10
      },
      {
        name: 'Item8',
        price: 7.99,
        stock: 10
      },
      {
        name: 'Item9',
        price: 8.99,
        stock: 10
      },
      {
        name: 'Item10',
        price: 9.99,
        stock: 10
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Items';
    return queryInterface.bulkDelete(options, null, {});
  }
};