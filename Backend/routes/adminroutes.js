const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admincontroller');

// Route pour obtenir tous les utilisateurs
router.get('/clients', AdminController.getAllClients);

// Route pour obtenir un utilisateur par son ID
router.get('/clients/:clientId', AdminController.getClientById);



// Route pour supprimer un utilisateur
router.delete('/clients/:clientId', AdminController.deleteClient);

module.exports = router;