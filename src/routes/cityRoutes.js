const express = require('express');
const CityController = require('../controllers/CityController');

const router = express.Router();

router.get('/', CityController.getAllCities);
router.get('/:cityId', CityController.getCityById);
router.post('/', CityController.createCity);
router.put('/:cityId', CityController.updateCity);
router.delete('/:cityId', CityController.deleteCity);

module.exports = router;
