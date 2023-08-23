const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cityRoutes = require('./src/routes/cityRoutes');

dotenv.config();

const app = express();

const mongoURI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
  }
};

connectDB();

app.use('/api/cities', cityRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
