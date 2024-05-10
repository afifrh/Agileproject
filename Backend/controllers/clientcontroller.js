const RendezVous = require('../models/rendez-vous');
const Ticket = require('../models/ticket');

const ClientController = {
  // Obtenir tous les rendez-vous d'un client
  getAllRendezVous: async (req, res) => {
    try {
      const { clientId } = req.params;
      const rendezVous = await RendezVous.find({ idClient: clientId });
      res.status(200).json(rendezVous);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération des rendez-vous du client' });
    }
  },

  // Prendre un rendez-vous pour un service spécifique
  prendreRendezVous: async (req, res) => {
    try {
      const { idClient, date, statut, numeroTicket, montant } = req.body;
      console.log( { idClient, date, statut, numeroTicket, montant } )
      // Implémenter la logique pour prendre un rendez-vous
      const nouveauRendezVous = new RendezVous({ idClient: idClient, date:date, status:statut, numeroTicket:numeroTicket, montant:montant });
      await nouveauRendezVous.save();
      res.status(201).json({ message: 'Rendez-vous pris avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la prise de rendez-vous' });
    }
  },

  // Réserver un ticket pour un service spécifique
  reserverTicket: async (req, res) => {
    try {
      const { idClient, id_rendezvous } = req.body;
      // Implémenter la logique pour réserver un ticket
      const nouveauTicket = new Ticket({ idClient: idClient, id_rendezvous:id_rendezvous });
      await nouveauTicket.save();
      res.status(201).json({ message: 'Ticket réservé avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la réservation du ticket' });
    }
  }
};

module.exports = ClientController;
