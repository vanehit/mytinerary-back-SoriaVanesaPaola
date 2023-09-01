const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/dataBase');
const cityRoutes = require('./src/routes/cityRoutes'); 
const itineraryRoutes = require('./src/routes/itineraryRoutes');
const accountsRoutes = require('./src/routes/cityAccounts');


dotenv.config();

const app = express();

// Configuración de CORS para permitir solicitudes desde el cliente
app.use(cors());

// Configuración para servir archivos estáticos
app.use(express.static('public'));

//indicamos que podemos recibir datos json en la solicitud
app.use(express.json())

connectDB(); // Llamamos a la función de conexión

app.use('/cities',cityRoutes);// Agregamos el enrutador de ciudades
app.use('/accounts', accountsRoutes);
app.use('/itineraries',itineraryRoutes);//agregamos el enrutador de los itinerarios


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`The server is running on port: ${port}`);
});
