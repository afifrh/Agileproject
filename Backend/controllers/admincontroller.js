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
    // Méthode pour mettre à jour un client
    updateClient: async (req, res) => {
      try {
        const { clientId } = req.params;
        const { nom,prenom,email,tel,username, password, role } = req.body;
  
        // Vérifie si le client existe
        const client = await Client.findByIdAndUpdate(clientId,{ nom,prenom,email,tel,username, password, role });
        if (!client) {
          return res.status(404).json({ message: 'Client non trouvé' });
        }
  
     
  
        // Enregistre les modifications dans la base de données
        await client.save();
  
        res.status(200).json({ message: 'Client mis à jour avec succès', updatedClient: client });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du client' });
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
  },
  getAllClientClients: async (req, res) => {
    try {
      const clientClients = await Client.find({ role: 'client' });
      res.status(200).json(clientClients);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération des clients avec le rôle "client"' });
    }
  },

  // Méthode pour obtenir tous les clients ayant le rôle "opérateur" ou "admin"
  getAllOperatorAndAdminClients: async (req, res) => {
    try {
      const operatorAndAdminClients = await Client.find({ role: { $in: ['operator', 'admin'] } });
      res.status(200).json(operatorAndAdminClients);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération des clients avec les rôles "opérateur" ou "admin"' });
    }
  }
};

module.exports = AdminController;
