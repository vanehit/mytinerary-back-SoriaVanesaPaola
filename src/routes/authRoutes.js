const express = require('express');
const { register, signIn } = require('../controllers/authController');
const { validateUser } = require('../middlewares/verifications');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/signup', validateUser, register);

// Ruta para iniciar sesión
router.post('/signin', signIn);

module.exports = router;
