const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/clientcontroller');

// Route pour obtenir tous les rendez-vous d'un client
router.get('/rendezvous/:clientId', ClientController.getAllRendezVous);

// Route pour prendre un rendez-vous pour un service spécifique
router.post('/rendezvous', ClientController.prendreRendezVous);

// Route pour réserver un ticket pour un service spécifique
router.post('/ticket', ClientController.reserverTicket);
// Route pour modifier un rendez-vous existant
router.put('/rendezvous/:rendezVousId', ClientController.modifierRendezVous);

// Route pour annuler un rendez-vous
router.delete('/rendezvous/:rendezVousId', ClientController.annulerRendezVous);

module.exports = router;
