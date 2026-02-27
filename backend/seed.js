require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./config/db');

connectDB();

const products = [
    {
        name: 'Node.js Guide',
        description: 'A comprehensive guide to backend development with Node.js.',
        price: 19.99,
        imageUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=600&auto=format&fit=crop'
    },
    {
        name: 'Express.js in Action',
        description: 'Learn how to build robust web applications using Express.',
        price: 24.99,
        imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop'
    },
    {
        name: 'MongoDB Essentials',
        description: 'Master NoSQL databases with this MongoDB crash course.',
        price: 29.99,
        imageUrl: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=600&auto=format&fit=crop'
    }
];

const seedDB = async () => {
    try {
        await Product.deleteMany(); // Clear existing
        await Product.insertMany(products);
        console.log('Database Seeded Successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
