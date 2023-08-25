const express = require('express');
const connectDB = require('./dataBase'); 
const CityModel = require('../models/cityModel');
const fs = require('fs');
const path = require('path');

// Ruta al archivo JSON
const dataFilePath = path.join(__dirname, '../../data.json');

// Esto Lee el archivo JSON y parsea los datos
const rawData = fs.readFileSync(dataFilePath, 'utf8');
const citiesData = JSON.parse(rawData);

const CityCollections = async () => {
  try {
    await connectDB();

    for (const data of citiesData) {
      const city = new CityModel({
        name: data.name,
        imageUrl: data.imageUrl,
        location: {
          country: data.location.country,
          city: data.location.city,
        },
      });
      await city.save();
    }

    console.log('City collections successfully inserted');
  } catch (err) {
    console.error('Error inserting city collections:', err);
  }
};

CityCollections();
