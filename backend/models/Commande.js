const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema({
  acheteur_id: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
  date_commande: { type: Date, default: Date.now },
  statut: { 
    type: String, 
    enum: ["En préparation", "Validée", "Expédiée", "Livrée", "Annulée"], 
    default: "En préparation" 
  },
  produits: [
    {
      produit_id: { type: mongoose.Schema.Types.ObjectId, ref: "Produit", required: true },
      quantite: { type: Number, required: true }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Commande", commandeSchema);