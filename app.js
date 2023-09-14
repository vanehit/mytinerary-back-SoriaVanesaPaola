const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const connectDB = require('./src/config/dataBase');
const cityRoutes = require('./src/routes/cityRoutes'); 
const itineraryRoutes = require('./src/routes/itineraryRoutes');
const accountsRoutes = require('./src/routes/cityAccounts');
const authRoutes = require('./src/routes/authRoutes'); // Importa tus rutas de autenticación

dotenv.config();

const secretKey = process.env.REACT_APP_JWT_SECRET_KEY;

const app = express();

// Configuración de CORS para permitir solicitudes desde el cliente
app.use(cors());

// Configuración para servir archivos estáticos
app.use(express.static('public'));

// Indicamos que podemos recibir datos JSON en la solicitud
app.use(express.json());

//configuración de passport
app.use(bodyParser.json());
app.use(passport.initialize());

connectDB(); // Conectamos la base de datos

app.use('/cities', cityRoutes); // Agregamos el enrutador de ciudades
app.use('/accounts', accountsRoutes);
app.use('/itineraries', itineraryRoutes); // Agregamos el enrutador de los itinerarios

// Montamos las rutas de autenticación en /auth
app.use('/auth', authRoutes);

app.get('/get-secret-key', (req, res) => {
  const secretKey = process.env.REACT_APP_JWT_SECRET_KEY;
  res.json({ secretKey });
});

// Aumentar el límite de carga máxima
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`The server is running on port: ${port}`);
});
