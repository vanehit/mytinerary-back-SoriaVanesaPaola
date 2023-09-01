const { Schema, model } = require('mongoose');

const citySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  location: {
    country: {
      type: String,
    },
    city: {
      type: String,
    },
  },
  population: {
    type: Number, 
  },
});

const CityModel = model('cityModel', citySchema);

module.exports = CityModel;
