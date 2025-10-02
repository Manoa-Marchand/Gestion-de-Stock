const express = require('express');
const mongoose = require('mongoose');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require('cors');

const app = express();
const port = 8080;

// Import des routes
const sessionRoutes = require("./routes/session");
const utilisateursRoutes = require("./routes/utilisateurs");

// Middleware
app.use(cors());
app.use(express.static('public')); // Fichiers HTML,CSS,JS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion MongoDB
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connecté à MongoDB'))
.catch((err) => console.error('Erreur MongoDB :', err));

// Sessions
app.use(session({
    secret: "Jefaisdemonmieux",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // durée du cookie (1 jour)
}));

// Utilisation des routes
app.use("/", sessionRoutes);
app.use("/utilisateurs", utilisateursRoutes);

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});