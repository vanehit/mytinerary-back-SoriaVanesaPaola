const Joi = require('joi');

// Definimos el esquema Joi para validar los datos de registro
const userSchema = Joi.object({
  username: Joi.string().alphanum().min(6).max(16).required(),
  email: Joi.string().email().alphanum().min(6).max(20).required(),
  password: Joi.string().alphanum().min(6).max(16).required(),
});

// esta función es para validar los datos de registro
const validateUser = (req, res, next) => {
  const payload = req.body;

  const userValidated =  userSchema.validate(payload);

  if ( userValidated.error) {
    return res.status(400).json({ message: userValidated.error.details.map((err) => err.message)});
  }

  next();

};

//este es el Controlador para registrar un nuevo usuario
const registerUser = async (req, res, next) => {
  try {
    // Validamos los datos de registro utilizando Joi
    const { error } = validateUser(req.body);

    //manejamos los errores con un mensaje de error
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }


    // Responder con éxito
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    // Manejar otros errores
    return res.status(400).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  validateUser,
  registerUser,
};
