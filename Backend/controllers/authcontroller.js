const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Client = require('../models/client');

const AuthController = {
  // Méthode pour gérer l'authentification des utilisateurs

  resetPassword: async (req, res) => {
    try {
      const { clientId } = req.params;
      const { password } = req.body;

      // Vérifie si le client existe
      const client = await Client.findByIdAndUpdate(clientId);
      if (!client) {
        return res.status(404).json({ message: 'Client non trouvé' });
      }

      // Génère un nouveau mot de passe haché
      const hashedPassword = await bcrypt.hash(password, 10);

      // Met à jour le mot de passe du client
      client.password = hashedPassword;

      // Enregistre les modifications dans la base de données
      await client.save();

      res.status(200).json({ message: 'Mot de passe réinitialisé avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la réinitialisation du mot de passe du client' });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      // Rechercher l'utilisateur dans la base de données
      const client = await Client.findOne({ username });
      if (!client) {
        return res.status(404).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
      }

      // If the password has been updated, update the client's password in the database
      if (client.resetPassword) {
        // Générer un token JWT pour l'utilisateur avec le nouveau mot de passe
        const token = jwt.sign({ id: client._id, username: client.username, role: client.role }, process.env.JWT_SECRET);
        res.status(200).json({ token });
      } else {
        // Vérifier si le mot de passe est correct
        const motDePasseCorrect = await bcrypt.compare(password, client.password);
        if (!motDePasseCorrect) {
          return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
        }
        // Générer un token JWT pour l'utilisateur
        const token = jwt.sign({ id: client._id, username: client.username, role: client.role }, process.env.JWT_SECRET);
        res.status(200).json({ token });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de l\'authentification' });
    }
  },




  // Méthode pour gérer l'inscription des utilisateurs
  register: async (req, res) => {
    try {
      const { nom,prenom,email,tel,username, password,role } = req.body;
      // Créer un nouvel utilisateur
      const client = new Client({ nom,prenom,email,tel,username, password,role});
      await client.save();
      res.status(201).json({ message: 'Inscription réussie' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de l\'inscription' });
    }
  },
  


};
module.exports = AuthController;
