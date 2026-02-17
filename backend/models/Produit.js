const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: String,
  prix: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  fournisseur_id: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Produit", produitSchema);