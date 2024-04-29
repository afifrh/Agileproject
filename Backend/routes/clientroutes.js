const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/clientcontroller');

// Route pour obtenir tous les rendez-vous d'un client
router.get('/:clientId/rendezvous', ClientController.getAllRendezVous);

// Route pour prendre un rendez-vous pour un service spécifique
router.post('/rendezvous', ClientController.prendreRendezVous);

// Route pour réserver un ticket pour un service spécifique
router.post('/ticket', ClientController.reserverTicket);

module.exports = router;
