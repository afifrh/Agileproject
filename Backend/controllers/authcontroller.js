const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Client = require('../models/client');

const AuthController = {
  // Méthode pour gérer l'authentification des utilisateurs
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      // Rechercher l'utilisateur dans la base de données
      const client = await Client.findOne({ username });
      console.log(username,password)
      if (!client) {
        return res.status(404).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
      }
      // Vérifier si le mot de passe est correct
      const motDePasseCorrect = await bcrypt.compare(password, client.password);
      if (!motDePasseCorrect) {
        return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
      }
      // Générer un token JWT pour l'utilisateur
      const token = jwt.sign({ id: client._id, username: client.username, role: client.role }, process.env.JWT_SECRET);
      res.status(200).json({ token });
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
