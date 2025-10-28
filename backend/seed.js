require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  { title: 'Wireless Headphones', description: 'Comfortable Bluetooth headphones', price: 49.99, category: 'electronics', image: '', stock: 50 },
  { title: 'Smart Watch', description: 'Track your activity', price: 79.99, category: 'electronics', image: '', stock: 30 },
  { title: 'Running Shoes', description: 'Lightweight running shoes', price: 59.99, category: 'clothing', image: '', stock: 100 },
  { title: 'Coffee Mug', description: 'Ceramic mug 350ml', price: 9.99, category: 'home', image: '', stock: 200 },
  { title: 'Laptop Sleeve', description: 'Protective sleeve 13inch', price: 19.99, category: 'accessories', image: '', stock: 70 },
];

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected, seeding products...');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Seed done');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
