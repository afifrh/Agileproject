var mongoose = require('mongoose');

// Schéma pour le modèle RendezVous
var rendezVousSchema = new mongoose.Schema({
  idClient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  statut: {
    type: String,
    enum: ["en_attente", "confirme", "termine", "annule"],
    default: "en_attente",
  },
  departement: {
    type: String,
    enum: ["Tunis", "Sousse", "Sfax"],
    required:true,
  },
  numeroTicket: {
    type: Number,
    unique: true,
  },
  montant: {
    type: Number,
    required: true,
  },
});

// Créer et exporter le modèle RendezVous
const RendezVous = mongoose.model('RendezVous', rendezVousSchema);
module.exports = RendezVous;
