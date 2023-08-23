const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  location: {
    country: String,
    city: String,
  },
});

const CityModel = mongoose.model('CityModel', citySchema);

module.exports = CityModel;
