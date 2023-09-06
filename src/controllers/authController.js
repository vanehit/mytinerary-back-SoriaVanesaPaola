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

    // Crear un nuevo usuario
    const newUser = new User({
      username: payload.username,
      email: payload.email,
      password: hashedPassword,
      // Otros campos del formulario
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    // Generar un token JWT después de guardar el usuario
    const token = jwt.sign({ userId: newUser._id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
