const RendezVous = require('../models/rendez-vous');
const Ticket =require('../models/ticket');


const OperatorController = {
  getAlltickets: async (req, res) => {
    try {
      const { clientId } = req.params;
      const ticket = await Ticket.find({ idClient: clientId });
      res.status(200).json(ticket);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération les tickets  du client' });
    }
  },
  // Méthode pour récupérer tous les rendez-vous en attente
  getRendezVousEnAttente: async (req, res) => {
    try {
      const rendezVousEnAttente = await RendezVous.find({ statut: 'en_attente' }).populate('idClient');
      res.status(200).json(rendezVousEnAttente);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération des rendez-vous en attente' });
    }
  },
  
  getAllRdv: async (req, res) => {
    try {
      const rdv = await RendezVous.find().populate('idClient');
      res.status(200).json(rdv);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération les rendez-vous  du client' });
    }
  },
  getRendezVousEnAttentebyDate: async (req, res) => {
    const currentDate=new Date()
    let rendezVousEnAttentebyDate 
    try {
      const rendezVousEnAttente = await RendezVous.find({ statut: 'en_attente' }).populate('idClient');
      for (let index = 0; index < rendezVousEnAttente.length(); index++) {
          if(rendezVousEnAttente[i].date==this.currentDate)    
          rendezVousEnAttentebyDate.push(rendezVousEnAttente[i])
      }
      res.status(200).json(rendezVousEnAttentebyDate);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération des rendez-vous en attente' });
    }
  },

  // Méthode pour recharger la carte d'un client
  rechargerCarte: async (req, res) => {
    try {
      const { clientId, montant } = req.body;
      // Implémenter ici la logique pour recharger la carte du client
      res.status(200).json({ message: `La carte du client ${clientId} a été rechargée avec succès de ${montant} DT` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors du rechargement de la carte' });
    }
  },
   getRdvById: async (req, res) => {
    try {
      const { rendezVousId } = req.params;
      console.log(rendezVousId)
      const rdv = await RendezVous.findById(rendezVousId);
      console.log(rdv)
      if (!rdv) {
        return res.status(404).json({ message: 'Rendez-vous  non trouvé' });
      }
      res.status(200).json(rdv);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération du rendez-vous' });
    }
  },

};

module.exports = OperatorController;
