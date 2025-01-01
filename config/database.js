const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Remove as opções deprecated
        await mongoose.connect('mongodb://localhost:27017/dbTeste');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
