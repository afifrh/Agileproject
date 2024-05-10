const express = require('express');
const router = express.Router();
const OperatorController = require('../controllers/operatorcontroller');

router.get('/ticket', OperatorController.getAlltickets);
router.get('/ticketbyDate', OperatorController.getRendezVousEnAttentebyDate);
// Route pour afficher tous les rendez-vous en attente
router.get('/rendezvous', OperatorController.getRendezVousEnAttente);

// Route pour recharger la carte d'un client
router.post('/recharge', OperatorController.rechargerCarte);

module.exports = router;
