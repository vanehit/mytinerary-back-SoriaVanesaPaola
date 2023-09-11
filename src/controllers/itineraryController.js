
const Itinerary = require('../models/itineraryModel');

const ItineraryController = {
  getAllItineraries: async (req, res) => {
    try {
      const itineraries = await Itinerary.find();
      res.json(itineraries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
    
   
  getItinerariesByCity: async (req, res) => {
    try {
      const cityId = req.params.cityId; 
      console.log("Fetching itineraries for cityId:", cityId);

      const itineraries = await Itinerary.find({ city: cityId });
      res.json(itineraries);
    } catch (error) {
      console.error("Error fetching itineraries by city:", error);
      res.status(500).json({ error: error.message });
    }
  },

  
  getItineraryById: async (req, res) => {
    try {
      const itineraryId = req.params.itineraryId; // Obtenemos el ID del itinerario de los parámetros de la URL
      const itinerary = await Itinerary.findById(itineraryId);
      if (!itinerary) {
        return res.status(404).json({ error: 'Itinerary not found' });
      }
      res.json(itinerary);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  createItinerary: async (req, res) => {
    try {
      const newItineraryData = {
        title: req.body.title,
        description: req.body.description,
        city: req.body.city,
        author: req.body.author,
        price: req.body.price,
        duration: req.body.duration,
        likes: req.body.likes,
        hashtags: req.body.hashtags
      };
  
      const newItinerary = await Itinerary.create(newItineraryData);
      res.status(201).json({ success: true, message: 'Itinerary added successfully', itinerary: newItinerary });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to add itinerary', error: error.message });
    }
  },

  updateItinerary: async (req, res) => {
    try {
      const updatedItinerary = await Itinerary.findByIdAndUpdate(
        req.params.itineraryId,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedItinerary);
    } catch (error) {
      console.error('Error while updating the itinerary:', error.message);
      res.status(500).json({ error: error.message });
    }
  },
  
  deleteItinerary: async (req, res) => {
    try {
      const deletedItinerary = await Itinerary.findByIdAndDelete(req.params.itineraryId);
      if (!deletedItinerary) {
        return res.status(404).json({ error: 'Itinerary not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = ItineraryController;
