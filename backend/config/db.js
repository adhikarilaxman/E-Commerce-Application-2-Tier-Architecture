const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Connect to MongoDB using connection string from environment variable
        // If not provided, fallback to local MongoDB instance
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce_db');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
