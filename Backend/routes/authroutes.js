const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authcontroller');

// Route pour la connexion
router.post('/login', AuthController.login);
router.put('/resetpassword/:clientId', AuthController.resetPassword);


// Route pour l'inscription
router.post('/register', AuthController.register);

module.exports = router;
