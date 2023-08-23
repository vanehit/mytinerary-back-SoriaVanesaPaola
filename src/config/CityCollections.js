const fs = require('fs');
const path = require('path');
const { dbConnectionPromise } = require('./app'); // Importamos la promesa de conexión desde app.js
const CityModel = require('../models/CityModel');

app.use('/public', express.static(path.join(__dirname, '/public')));

const citiesData = JSON.parse(fs.readFileSync(citiesFilePath, 'utf8'));

const CityCollections = async () => {
  try {
    await dbConnectionPromise;

    await CityModel.insertMany(citiesData);
    console.log('Colecciones de ciudades insertadas exitosamente');
  } catch (err) {
    console.error('Error al insertar las colecciones de ciudades:', err);
  }
};

CityCollections();
