require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');

connectDB();

const seedAdmin = async () => {
    try {
        // Check if admin already exists
        const existingAdmin = await User.findOne({ username: 'admin' });
        if (existingAdmin) {
            console.log('Admin user already exists!');
            process.exit();
        }

        // Create admin user
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = new User({
            username: 'admin',
            password: hashedPassword
        });

        await admin.save();
        console.log('✅ Admin user created successfully!');
        console.log('Username: admin');
        console.log('Password: admin123');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAdmin();
