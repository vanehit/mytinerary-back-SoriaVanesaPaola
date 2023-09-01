const express = require('express');
const CityController = require('../controllers/cityController');


const router = express.Router();

router.get('/', CityController.getAllCities); // Obtenemos todas las ciudades
router.get('/:_id', CityController.getCityById); // Obtenemos ciudad por ID
router.post('/city', CityController.createCity); // Creamos nueva ciudad
router.put('/:_id', CityController.updateCity); // Actualizamos ciudad por ID
router.delete('/:_id', CityController.deleteCity); // Eliminamos ciudad por ID




module.exports = router;
