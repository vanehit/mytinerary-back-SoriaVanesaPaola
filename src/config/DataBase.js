const mongoose = require('mongoose');
require('dotenv').config();

const uri_link = process.env.URI_LINK;

const connectDB = async () => {
  try {
    await mongoose.connect(uri_link, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;
