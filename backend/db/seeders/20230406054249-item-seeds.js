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
        description: 'Lorem ipsum dolor sit amet. Est voluptates sapiente qui autem expedita in asperiores dolor sit quia expedita sit itaque ipsa. In unde blanditiis id nesciunt impedit et autem deleniti ut deleniti modi sit iure eaque in ipsam quia.',
        price: 0.99,
        stock: 10
      },
      {
        name: 'Item2',
        image: 'https://ruinmyweek.com/wp-content/uploads/2021/03/random-facts-about-everyday-items-16.jpg',
        description: 'Sit minus cupiditate est consequuntur expedita id voluptas iure sit temporibus ratione sit harum rerum eum porro debitis.',
        price: 1.99,
        stock: 10
      },
      {
        name: 'Item3',
        image: 'https://ruinmyweek.com/wp-content/uploads/2021/03/random-facts-about-everyday-items-2.jpg',
        description: 'Eos recusandae corporis ea architecto totam eum temporibus minima. Ut velit repellendus eos cumque dolorum in magnam nesciunt ut omnis nihil!',
        price: 2.99,
        stock: 10
      },
      {
        name: 'Item4',
        image: 'https://ruinmyweek.com/wp-content/uploads/2021/03/random-facts-about-everyday-items-5.jpg',
        description: 'Non repellat quaerat est consectetur omnis et ducimus quisquam sit facere sunt aut nisi aliquam qui harum facere. Ut aliquid galisum et tenetur dolor At maxime voluptatem qui nisi asperiores et aliquam distinctio.',
        price: 3.99,
        stock: 10
      },
      {
        name: 'Item5',
        image: 'https://ruinmyweek.com/wp-content/uploads/2021/03/random-facts-about-everyday-items-28.jpg',
        description: 'Eos voluptate atque ut repellat aperiam aut voluptatem iure.',
        price: 4.99,
        stock: 10
      },
      {
        name: 'Item6',
        image: 'https://ruinmyweek.com/wp-content/uploads/2021/03/random-facts-about-everyday-items-12.jpg',
        description: 'Non repellendus nulla in quae eaque et repellendus quidem hic magnam autem et rerum quam aut blanditiis eligendi.',
        price: 5.99,
        stock: 10
      },
      {
        name: 'Item7',
        image: 'https://ruinmyweek.com/wp-content/uploads/2021/03/random-facts-about-everyday-items-19.jpg',
        description: 'Sit dolorum voluptate eos Quis voluptas ad quibusdam nihil eum quia aliquam aut obcaecati earum et aspernatur exercitationem ea asperiores blanditiis.',
        price: 6.99,
        stock: 10
      },
      {
        name: 'Item8',
        image: 'https://cdn.shopify.com/s/files/1/2599/8718/products/RANDOM-HOUSE-Step-1-into-Reading-Book_972234A_800x.jpg?v=1631330445',
        description: 'Et quibusdam minus et explicabo facere et omnis debitis est sequi reprehenderit vel repellat blanditiis qui sint maiores?',
        price: 7.99,
        stock: 10
      },
      {
        name: 'Item9',
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2020-05/8/20/asset/43bda651a49d/sub-buzz-2152-1588970671-7.jpg',
        description: 'Et aliquid enim quo cupiditate architecto ut quaerat amet in officia placeat et facere suscipit ea neque nisi est distinctio nihil! Est molestiae laudantium ut natus vero et iure quos et autem consequatur.',
        price: 8.99,
        stock: 10
      },
      {
        name: 'Item10',
        image: 'https://img.buzzfeed.com/buzzfeed-static/static/2020-05/11/16/asset/7d9526cdbdf3/sub-buzz-10857-1589216059-1.jpg',
        description: 'Non nihil voluptatem ut facere deleniti aut delectus consequatur non alias quidem aut alias dolorem quo sint mollitia aut nisi libero.',
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
