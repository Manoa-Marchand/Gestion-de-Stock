import mongoose from "mongoose";

const utilisateurSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mot_de_passe: { type: String, required: true },
  role: {
    type: String,
    enum: ["Administrateur", "Fournisseur", "Acheteur", "Gestionnaire", "Logisticien"],
    required: true
  }
}, { timestamps: true });

const Utilisateur =
  mongoose.models.Utilisateur ||
  mongoose.model("Utilisateur", utilisateurSchema);

export default Utilisateur;