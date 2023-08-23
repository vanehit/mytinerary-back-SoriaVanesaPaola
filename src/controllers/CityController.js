const CityModel = require('../models/CityModel');

const CityController = {
  getAllCities: async (req, res) => {
    try {
      const cities = await CityModel.find();
      res.json(cities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCityById: async (req, res) => {
    try {
      const cityId = await CityModel.findById(req.params.cityId);
      if (!cityId) {
        return res.status(404).json({ error: 'Ciudad no encontrada' });
      }
      res.json(cityId);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createCity: async (req, res) => {
    try {
      const newCity = await CityModel.create(req.body);
      res.status(201).json(newCity);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateCity: async (req, res) => {
    try {
      const updatedCity = await CityModel.findByIdAndUpdate(
        req.params.cityId,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedCity);
    } catch (error) {
      console.error('Error al actualizar la ciudad:', error.message);
      res.status(500).json({ error: error.message });
    }
  },

  deleteCity: async (req, res) => {
    try {
      const deletedCity = await CityModel.findByIdAndDelete(req.params.cityId);
      if (!deletedCity) {
        return res.status(404).json({ error: 'Ciudad no encontrada' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = CityController;
