const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const register = async (req, res) => {
  try {
    const payload = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email: payload.email });

    if (existingUser) {
      return res.status(403).json({ message: 'The user already exists' });
    }

    // Hash de la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    // Asignamos el rol como 'USUARIO'
    let role = 'user';

     // Verificamos si estamos registrando al administrador
     if (payload.isAdmin) {
      role = 'administrator';
    }

    // Crear un nuevo usuario
    const newUser = new User({
      username: payload.username,
      email: payload.email,
      password: hashedPassword,
      role: role,
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    // Generar un token JWT después de guardar el usuario
    const token = jwt.sign({ userId: newUser._id }, process.env.REACT_APP_JWT_SECRET_KEY, { expiresIn: '1h' });


    res.status(201).json({ message: 'User created successfully', token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const signIn = async (req, res) => {
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

    // Generar un token JWT después de la autenticación
    const token = jwt.sign({ userId: newUser._id }, process.env.REACT_APP_JWT_SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Authentication successful', token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = {
  register,
  signIn,
}

