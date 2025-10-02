const express = require("express");
const router = express.Router();
const Utilisateur = require("../models/Utilisateur");

// CREATE
router.post("/", async (req, res) => {
    try {
        const user = new Utilisateur(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// READ all
router.get("/", async (req, res) => {
    const users = await Utilisateur.find();
    res.json(users);
});

// READ one
router.get("/:id", async (req, res) => {
    const user = await Utilisateur.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json(user);
});

// UPDATE
router.put("/:id", async (req, res) => {
    const user = await Utilisateur.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
});

// DELETE
router.delete("/:id", async (req, res) => {
    await Utilisateur.findByIdAndDelete(req.params.id);
    res.json({ message: "Utilisateur supprimé" });
});

// Signup
router.post("/signup", async (req, res) => {
    const { nom, email, mot_de_passe, role } = req.body;
    try {
        const exist = await Utilisateur.findOne({ email });
        if (exist) return res.status(400).json({ message: "Email déjà utilisé" });

        const user = new Utilisateur({ nom, email, mot_de_passe, role });
        await user.save();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// Login
router.post("/login", async (req, res) => {
    const { email, mot_de_passe } = req.body;
    try {
        const user = await Utilisateur.findOne({ email });
        if (!user || user.mot_de_passe !== mot_de_passe) {
            return res.status(400).json({ message: "Email ou mot de passe incorrect" });
        }

        // Session
        req.session.userId = user._id;
        req.session.role = user.role;

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

module.exports = router;