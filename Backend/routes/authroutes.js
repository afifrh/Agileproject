const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authcontroller');

// Route pour la connexion
router.post('/login', AuthController.login);

// Route pour l'inscription
router.post('/register', AuthController.register);

module.exports = router;
