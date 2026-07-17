import Candidat from "../models/Candidat.js";
import Profil from "../models/Profil.js";

// Créer un candidat
export const createCandidat = async (req, res) => {
  try {
    const candidat = await Candidat.create({
      user: req.user._id,
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      telephone: req.body.telephone,
    });

    res.status(201).json(candidat);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Créer un profil
export const createProfil = async (req, res) => {
  try {
    const profil = await Profil.create({
      candidat: req.user._id,
      ...req.body,
    });

    res.status(201).json(profil);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Récupérer mon profil
export const getMyProfil = async (req, res) => {
  try {
    const profil = await Profil.findOne({
      candidat: req.user._id,
    });

    res.json(profil);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Récupérer tous les candidats
export const getCandidats = async (req, res) => {
  try {
    const candidats = await Candidat.find();

    res.json(candidats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getStats = async (req, res) => {
  try {
    const candidatureCount = await Candidature.countDocuments({
      candidat: req.user._id,
    });

    const profil = await Profil.findOne({ user: req.user._id });

    const parStatut = await Candidature.aggregate([
      { $match: { candidat: req.user._id } },
      { $group: { _id: "$statut", count: { $sum: 1 } } },
    ]);

    res.json({
      totalCandidatures: candidatureCount,
      portfolioServices: profil ? 1 : 0,
      repartitionParStatut: parStatut.length,
      scoreProfil: profil?.scoreProfil ?? null,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
