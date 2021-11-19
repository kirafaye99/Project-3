const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Cards' },
    { name: 'Figurines' },
    { name: 'Electronics' },
    { name: 'Collectibles' },
    { name: 'Comic Books' },
    { name: 'Video Games' },
    { name: 'Posters' },
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
      category: categories[5]._id,
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
    },
    {
      name: 'Game of Thrones Signed Poster',
      category: categories[6]._id,
      description:
        'Pay homage to Game Of Thrones, with this gallery-framed, officially licensed, limited edition facsimile of hand-signed mini poster, originally signed by Kit Harington, Emilia Clarke, Peter Dinklage, Lena Headey, Nikolaj Coster-Waldau, Jack Gleeson, Sean Bean, Michelle Fairley, Iain Glen, and Jason Momoa , of which is strictly limited to 100 units Worldwide, and has been approved and numbered accordingly.',
      image: 'got-poster.jpg',
      price: 200,
      quantity: 1
    },
    {
      name: 'Captain America Comics No 2',
      category: categories[4]._id,
      description:
        'Read all about Captain America and all about how he saves the day',
      image: 'captain-america-comic.jpeg',
      price: 15000,
      quantity: 1
    },
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
