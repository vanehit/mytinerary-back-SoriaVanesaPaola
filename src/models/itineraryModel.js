const { Schema, model } = require('mongoose');

const itinerarySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City',
    required: true
  },
  author: {
    type: String, 
    required: true
  },
  price: {
    type: Number, 
    required: true
  },
  duration: {
    type: Number, 
    required: true
  },
  likes: {
    type: Number, 
    required: true
  },
  hashtags: {
    type: [String], 
    required: true
  }
});

const Itinerary = model('Itinerary', itinerarySchema);

module.exports = Itinerary;
