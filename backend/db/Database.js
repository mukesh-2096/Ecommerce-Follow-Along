const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('MongoDB connected');
    })
    .catch((error) => {
      console.log('Error connecting to MongoDB:', error);
    });
};

module.exports = connectDatabase;
