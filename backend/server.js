import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const port = 8080;
dotenv.config();

// Import des routes
import utilisateursRoutes from "./routes/utilisateurs.js";

// Middleware
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connecté à MongoDB à la DB:", mongoose.connection.name))
.catch(err => console.log(err));

// Utilisation des routes
app.get("/", (req,res)=>{
  res.send("API OK");
});

app.use("/api/utilisateurs", utilisateursRoutes);

// Tests


// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});