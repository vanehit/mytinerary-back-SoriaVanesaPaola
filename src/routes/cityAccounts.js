const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accountsController');

// Rutas para cuentas
router.get('/accounts', accountsController.getAllAccounts);
router.get('/accounts/:_id', accountsController.getAccountById);
router.post('/accounts', accountsController.createAccount);
router.put('/accounts/:_id', accountsController.updateAccount);
router.delete('/accounts/:_id', accountsController.deleteAccount);

module.exports = router;
