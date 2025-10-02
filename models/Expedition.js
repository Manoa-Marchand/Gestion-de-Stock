const mongoose = require("mongoose");

const expeditionSchema = new mongoose.Schema({
  commande_id: { type: mongoose.Schema.Types.ObjectId, ref: "Commande", required: true },
  logisticien_id: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
  date_depart: { type: Date, default: Date.now },
  date_arrivee: Date,
  statut: { 
    type: String, 
    enum: ["En cours", "Livrée", "Retardée"], 
    default: "En cours" 
  }
}, { timestamps: true });

module.exports = mongoose.model("Expedition", expeditionSchema);