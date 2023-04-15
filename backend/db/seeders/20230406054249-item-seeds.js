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
        image: 'https://www.seekpng.com/png/full/79-793517_yard-sale-items-png-box-of-old-stuff.png',
        price: 0.99,
        stock: 10
      },
      {
        name: 'Item2',
        image: 'https://ruinmyweek.com/wp-content/uploads/2021/03/random-facts-about-everyday-items-16.jpg',
        price: 1.99,
        stock: 10
      },
      {
        name: 'Item3',
        image: 'https://ruinmyweek.com/wp-content/uploads/2021/03/random-facts-about-everyday-items-2.jpg',
        price: 2.99,
        stock: 10
      },
      {
        name: 'Item4',
        image: 'https://ruinmyweek.com/wp-content/uploads/2021/03/random-facts-about-everyday-items-5.jpg',
        price: 3.99,
        stock: 10
      },
      {
        name: 'Item5',
        image: 'https://ruinmyweek.com/wp-content/uploads/2021/03/random-facts-about-everyday-items-28.jpg',
        price: 4.99,
        stock: 10
      },
      {
        name: 'Item6',
        image: 'https://ruinmyweek.com/wp-content/uploads/2021/03/random-facts-about-everyday-items-12.jpg',
        price: 5.99,
        stock: 10
      },
      {
        name: 'Item7',
        image: 'https://ruinmyweek.com/wp-content/uploads/2021/03/random-facts-about-everyday-items-19.jpg',
        price: 6.99,
        stock: 10
      },
      {
        name: 'Item8',
        image: 'https://cdn.shopify.com/s/files/1/2599/8718/products/RANDOM-HOUSE-Step-1-into-Reading-Book_972234A_800x.jpg?v=1631330445',
        price: 7.99,
        stock: 10
      },
      {
        name: 'Item9',
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2020-05/8/20/asset/43bda651a49d/sub-buzz-2152-1588970671-7.jpg',
        price: 8.99,
        stock: 10
      },
      {
        name: 'Item10',
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2020-05/11/16/asset/7d9526cdbdf3/sub-buzz-10857-1589216059-1.jpg',
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