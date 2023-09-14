const express = require('express');
const { validateUser } = require('../middlewares/verifications');
const { register, signIn } = require('../controllers/authController');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcrypt'); 


const router = express.Router();


router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(403).json({ message: 'The user already exists' });
    }

    // Hash de la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuevo usuario
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Guarda el usuario en la base de datos
    await newUser.save();

   // Genera un token JWT después de guardar el usuario
   const secretKey = process.env.REACT_APP_JWT_SECRET_KEY; 
   const token = jwt.sign({ userId: newUser._id }, secretKey, {
     expiresIn: '1h',
   });


    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Buscar al usuario por su dirección de correo electrónico
    const user = await User.findOne({ email });

    // Si no se encuentra el usuario, retornar un error
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed. User not found.' });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed. Invalid password.' });
    }

    // Genera un token JWT después de verificar la contraseña
    const secretKey = process.env.REACT_APP_JWT_SECRET_KEY;
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Authentication successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});





module.exports = router;
