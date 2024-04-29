const Client = require('../models/client');

const AdminController = {
  // Méthode pour obtenir tous les clients
  getAllClients: async (req, res) => {
    try {
      const clients = await Client.find({});
      res.status(200).json(clients);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération des clients' });
    }
  },

  // Méthode pour obtenir un client par son ID
  getClientById: async (req, res) => {
    try {
      const { clientId } = req.params;
      const client = await Client.findById(clientId);
      if (!client) {
        return res.status(404).json({ message: 'Client non trouvé' });
      }
      res.status(200).json(client);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération du client' });
    }
  },

  // Méthode pour supprimer un client
  deleteClient: async (req, res) => {
    try {
      const { clientId } = req.params;
      await Client.findByIdAndDelete(clientId);
      res.status(200).json({ message: 'Client supprimé avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la suppression du client' });
    }
  }
};

module.exports = AdminController;
