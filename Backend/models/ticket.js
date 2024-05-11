const mongoose = require('mongoose');

// Schéma pour le modèle Ticket
const schemaTicket = new mongoose.Schema({
  idClient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  montant: {
    type: Number,
    required: true
  }
  // Ajoutez d'autres champs si nécessaire
});

// Créer et exporter le modèle Ticket
const Ticket = mongoose.model('Ticket', schemaTicket);
module.exports = Ticket;
