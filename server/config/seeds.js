const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Cards' },
    { name: 'Figurines' },
    { name: 'Electronics' },
    { name: 'Collectibles' },
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Dungeons and Dragons Miniatures',
      description:
        'Assorted collection of DnD miniatures.',
      image: 'assorted-dnd-minis.jpg',
      category: categories[1]._id,
      price: 50.00,
      quantity: 25
    },
    {
      name: 'Chrono Trigger on Nintendo Super NES',
      description:
        'Original Chrono Trigger, mint condition.',
      image: 'chrono-trigger.jpg',
      category: categories[2]._id,
      price: 1500.00,
      quantity: 1
    },
    {
      name: 'Dominion Second Edition',
      category: categories[0]._id,
      description:
        'Starter deck for Dominion the card game.',
      image: 'dominion.jpg',
      price: 50.00,
      quantity: 20
    },
    {
      name: 'My Precious',
      category: categories[3]._id,
      description:
        'Lord of the rings replica, screen accurate, glows in the dark!',
      image: 'golden-ring.jpg',
      price: 500.00,
      quantity: 1
    },
    {
      name: 'Killua Funko',
      category: categories[1]._id,
      description:
        'Killua Zoldyck POP Funko from Hunter X Hunter Anime',
      image: 'killua-funko.jpg',
      price: 17.99,
      quantity: 40
    },
    {
      name: 'Magic Commander Deck',
      category: categories[0]._id,
      description:
        'Commander deck to add to you Magic the Gathering deck.',
      image: 'magic-deck.jpg',
      price: 72.99,
      quantity: 5
    },
    {
      name: 'Thanos Gauntlet',
      category: categories[2]._id,
      description:
        'Genuine Thanos gauntlet with all six infinity stones, rule the universe today!',
      image: 'thanos-gauntlet.jpg',
      price: 100000.99,
      quantity: 1
    }
    // {
    //   name: 'Tales at Bedtime',
    //   category: categories[3]._id,
    //   description:
    //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
    //   image: 'bedtime-book.jpg',
    //   price: 9.99,
    //   quantity: 100
    // },
    // {
    //   name: 'Spinning Top',
    //   category: categories[4]._id,
    //   description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
    //   image: 'spinning-top.jpg',
    //   price: 1.99,
    //   quantity: 1000
    // },
    // {
    //   name: 'Set of Plastic Horses',
    //   category: categories[4]._id,
    //   description:
    //     'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
    //   image: 'plastic-horses.jpg',
    //   price: 2.99,
    //   quantity: 1000
    // },
    // {
    //   name: 'Teddy Bear',
    //   category: categories[4]._id,
    //   description:
    //     'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',
    //   image: 'teddy-bear.jpg',
    //   price: 7.99,
    //   quantity: 100
    // },
    // {
    //   name: 'Alphabet Blocks',
    //   category: categories[4]._id,
    //   description:
    //     'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
    //   image: 'alphabet-blocks.jpg',
    //   price: 9.99,
    //   quantity: 600
    // }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
