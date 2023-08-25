const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cityRoutes = require('./src/routes/cityRoutes');
const connectDB = require('./src/config/dataBase'); 

dotenv.config();

const app = express();

// Configuración de CORS para permitir solicitudes desde el cliente
app.use(cors());

// Configuración para servir archivos estáticos
app.use(express.static('public'));

connectDB(); // Llamamos a la función de conexión

app.use(cityRoutes);// Agregamos el enrutador de ciudades

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`The server is running on port: ${port}`);
});
