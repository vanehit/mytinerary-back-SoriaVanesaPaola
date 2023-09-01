const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true
  },
  author: {
    type: String, // Cambia el tipo según corresponda
    required: true
  },
  price: {
    type: Number, // Cambia el tipo según corresponda
    required: true
  },
  duration: {
    type: Number, // Cambia el tipo según corresponda
    required: true
  },
  likes: {
    type: Number, // Cambia el tipo según corresponda
    required: true
  },
  hashtags: {
    type: [String], // Cambia el tipo según corresponda
    required: true
  }
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary;
