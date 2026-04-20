require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./config/db');

connectDB();

const products = [
    {
        name: 'Node.js Complete Guide',
        description: 'A comprehensive guide to backend development with Node.js. Master async programming, REST APIs, and real-world patterns.',
        price: 1499,
        imageUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=600&auto=format&fit=crop'
    },
    {
        name: 'Express.js in Action',
        description: 'Learn how to build robust web applications and APIs using Express.js with best practices and real projects.',
        price: 1999,
        imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop'
    },
    {
        name: 'MongoDB Essentials',
        description: 'Master NoSQL databases with this MongoDB crash course. Schema design, aggregation, and performance tuning.',
        price: 2499,
        imageUrl: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=600&auto=format&fit=crop'
    },
    {
        name: 'React 18 Mastery',
        description: 'Build modern, performant UIs with React 18. Covers hooks, context, server components, and advanced patterns.',
        price: 2999,
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop'
    },
    {
        name: 'Full-Stack JavaScript',
        description: 'From zero to hero with the MERN stack. Build production-ready applications with authentication and deployment.',
        price: 3999,
        imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=600&auto=format&fit=crop'
    },
    {
        name: 'DevOps for Developers',
        description: 'Learn CI/CD pipelines, Docker, Kubernetes, and cloud deployments. Bridge the gap between dev and ops.',
        price: 3499,
        imageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=600&auto=format&fit=crop'
    },
    {
        name: 'TypeScript Deep Dive',
        description: 'Unlock the full power of TypeScript. Generics, decorators, advanced types, and integration with React & Node.',
        price: 1799,
        imageUrl: 'https://images.unsplash.com/photo-1613909207039-6b173b755cc1?q=80&w=600&auto=format&fit=crop'
    },
    {
        name: 'Python for Data Science',
        description: 'Pandas, NumPy, Matplotlib and machine learning fundamentals for aspiring data scientists.',
        price: 2799,
        imageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=600&auto=format&fit=crop'
    },
    {
        name: 'System Design Primer',
        description: 'Ace your system design interviews. Scalability, load balancing, caching, databases, and distributed systems.',
        price: 4499,
        imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop'
    }
];

const seedDB = async () => {
    try {
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log('✅ Database Seeded Successfully with Indian Prices!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
