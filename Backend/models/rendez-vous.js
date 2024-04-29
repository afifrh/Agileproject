const mongoose = require('mongoose');

// Schéma pour le modèle RendezVous
const rendezVousSchema = new mongoose.Schema({
  idClient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  statut: {
    type: String,
    enum: ['en_attente', 'confirme', 'termine', 'annule'],
    default: 'en_attente'
  },
  numeroTicket: {
    type: Number,
    required: true,
    unique: true
  },
  montant: {
    type: Number,
    required: true
  }
});

// Créer et exporter le modèle RendezVous
const RendezVous = mongoose.model('RendezVous', rendezVousSchema);
module.exports = RendezVous;
