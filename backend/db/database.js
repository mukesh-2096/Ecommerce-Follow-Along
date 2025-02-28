const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

console.log('DB_URL:', process.env.DB_URL); // Add this line to check if the DB_URL is loaded

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Failed:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
