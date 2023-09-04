const express = require('express');
const router = express.Router();
const ItineraryController = require('../controllers/itineraryController');


router.get('/', ItineraryController.getAllItineraries); // Ruta para obtener todos los itinerarios
router.get('/itineraries/city/:cityId', ItineraryController.getItinerariesByCity); // Ruta para obtener los itinerarios de una ciudad en particular
router.get('/:itineraryId', ItineraryController.getItineraryById);// Ruta para obtener un itinerario por su ID
router.post('/', ItineraryController.createItinerary);// Ruta para crear un nuevo itinerario
router.put('/:itineraryId', ItineraryController.updateItinerary);// Ruta para actualizar un itinerario
router.delete('/:itineraryId', ItineraryController.deleteItinerary);// Ruta para eliminar un itinerario

module.exports = router;
