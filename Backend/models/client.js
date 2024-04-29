const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Schéma pour le modèle Client
const clientSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'operator', 'client'], // Les rôles possibles
    default: 'client' // Par défaut, le rôle est client
  }
});

// Avant de sauvegarder le client dans la base de données, hash le mot de passe
clientSchema.pre('save', async function (next) {
  const client = this;
  if (client.isModified('password') || client.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(client.password, 10);
      client.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    return next();
  }
});

// Méthode pour comparer les mots de passe
clientSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Créer et exporter le modèle Client
const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
