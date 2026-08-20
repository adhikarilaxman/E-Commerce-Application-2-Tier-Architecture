require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');

connectDB().then(async () => {
    const Product = require('./models/Product');
    const User = require('./models/User');

    if (await Product.countDocuments() === 0) {
        await Product.insertMany([
            { name: 'Node.js Complete Guide',    description: 'A comprehensive guide to backend development with Node.js. Master async programming, REST APIs, and real-world patterns.',        price: 1499, imageUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=600&auto=format&fit=crop' },
            { name: 'Express.js in Action',       description: 'Learn how to build robust web applications and APIs using Express.js with best practices and real projects.',                  price: 1999, imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop' },
            { name: 'MongoDB Essentials',         description: 'Master NoSQL databases with this MongoDB crash course. Schema design, aggregation, and performance tuning.',                  price: 2499, imageUrl: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=600&auto=format&fit=crop' },
            { name: 'React 18 Mastery',           description: 'Build modern, performant UIs with React 18. Covers hooks, context, server components, and advanced patterns.',               price: 2999, imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop' },
            { name: 'Full-Stack JavaScript',      description: 'From zero to hero with the MERN stack. Build production-ready applications with authentication and deployment.',              price: 3999, imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=600&auto=format&fit=crop' },
            { name: 'DevOps for Developers',      description: 'Learn CI/CD pipelines, Docker, Kubernetes, and cloud deployments. Bridge the gap between dev and ops.',                      price: 3499, imageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=600&auto=format&fit=crop' },
            { name: 'TypeScript Deep Dive',       description: 'Unlock the full power of TypeScript. Generics, decorators, advanced types, and integration with React & Node.',             price: 1799, imageUrl: 'https://images.unsplash.com/photo-1613909207039-6b173b755cc1?q=80&w=600&auto=format&fit=crop' },
            { name: 'Python for Data Science',    description: 'Pandas, NumPy, Matplotlib and machine learning fundamentals for aspiring data scientists.',                                  price: 2799, imageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=600&auto=format&fit=crop' },
            { name: 'System Design Primer',       description: 'Ace your system design interviews. Scalability, load balancing, caching, databases, and distributed systems.',              price: 4499, imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop' },
        ]);
        console.log('✅ Database seeded with products');
    }

    if (!await User.findOne({ username: 'admin' })) {
        await new User({ username: 'admin', password: await bcrypt.hash('admin123', 10) }).save();
        console.log('✅ Admin user created (admin / admin123)');
    }
});

const app = express();
app.set('trust proxy', 1);

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174', 'http://localhost', 'http://localhost:80'],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret123',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, sameSite: 'lax', maxAge: 86400000 },
}));

app.use('/auth',     require('./routes/authRoutes'));
app.use('/products', require('./routes/productRoutes'));
app.use('/cart',     require('./routes/cartRoutes'));
app.use('/orders',   require('./routes/orderRoutes'));

app.get('/', (_req, res) => res.json({ message: 'API is running' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
