const express = require("express");
const router = express.Router();
const Utilisateur = require("../models/Utilisateur");

// Dashboard
router.get("/dashboard", async (req, res) => {
    if (!req.session.userId) return res.status(401).json({ message: "Non connecté" });

    try {
        const user = await Utilisateur.findById(req.session.userId);
        if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

        res.json({ nom: user.nom, role: user.role });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// Logout
router.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: "Erreur déconnexion" });
        res.clearCookie("connect.sid");
        res.sendStatus(200);
    });
});

module.exports = router;