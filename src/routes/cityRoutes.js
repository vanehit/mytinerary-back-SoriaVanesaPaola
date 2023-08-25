const express = require('express');
const CityController = require('../controllers/cityController');

const router = express.Router();

router.get('/cities', CityController.getAllCities); // Obtenemos todas las ciudades
router.get('/cities/:_id', CityController.getCityById); // Obtenemos ciudad por ID
router.post('/cities', CityController.createCity); // Creamos nueva ciudad
router.put('/cities/:_id', CityController.updateCity); // Actualizamos ciudad por ID
router.delete('/cities/:_id', CityController.deleteCity); // Eliminamos ciudad por ID

module.exports = router;
