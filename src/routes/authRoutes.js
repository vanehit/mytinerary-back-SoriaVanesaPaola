const express = require('express');
const { validateUser } = require('../middlewares/verifications');
const { register, signIn } = require('../controllers/authController');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', validateUser, register);

// Ruta para iniciar sesión
router.post('/login', signIn);



module.exports = router;
