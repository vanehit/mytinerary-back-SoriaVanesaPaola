const CityModel = require('../models/cityModel');
//obtenemos todas las ciudades
const CityController = {
  getAllCities: async (req, res) => {
    try {
      const { search } = req.query; // obtenemos la búsqueda del query string
  
      let cities;
  
      if (search) {
        const regexSearch = new RegExp(`^${search}$`, 'i'); // Búsqueda exacta (insensible a mayúsculas y minúsculas)
  
        cities = await CityModel.find({
          name: regexSearch
        });
      } else {
        // Si no obtenemos todas las ciudades
        cities = await CityModel.find();
      }
  
      res.json(cities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //Buscamos una ciudad por su ID y la devuelve como respuesta JSON
  getCityById: async (req, res) => {
    try {
      const city = await CityModel.findById(req.params._id);
      if (!city) {
        return res.status(404).json({ error: 'City not found' }); 
      }
      res.json(city); 
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //Creamos una nueva ciudad utilizando los datos proporcionados en el cuerpo de la solicitud. Devuelve la ciudad recién creada en la respuesta con un código de estado 201. Si ocurre un error, se devuelve un código de estado 500 con un mensaje de error.
  createCity: async (req, res) => {
    try {
      const newCity = await CityModel.create(req.body);
      res.status(201).json({ success: true, message: "City added successfully", city: newCity });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to add city", error: error.message });
    }
  },
  

  //Actualizamos una ciudad existente por su ID utilizando los datos proporcionados 
  updateCity: async (req, res) => {
    try {
      const updatedCity = await CityModel.findByIdAndUpdate(
        req.params._id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedCity);
    } catch (error) {
      console.error('Error while updating the city:', error.message);
      res.status(500).json({ error: error.message });
    }
  },

  //Elimina una ciudad por su ID
  deleteCity: async (req, res) => {
    try {
      const deletedCity = await CityModel.findByIdAndDelete(req.params._id); 
      if (!deletedCity) {
        return res.status(404).json({ error: 'City not found' }); // Cambia City no Found a City not found
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = CityController;
