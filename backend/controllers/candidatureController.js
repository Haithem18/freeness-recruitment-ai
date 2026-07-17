import Candidature from "../models/Candidature.js";

export const postuler = async (req, res) => {
  try {
    const { offre, lettreMotivation } = req.body;

    const candidature = await Candidature.create({
      candidat: req.user._id,
      offre,
      lettreMotivation,
    });

    res.status(201).json(candidature);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Vous avez déjà postulé à cette offre.",
      });
    }
    res.status(500).json({
      message: error.message,
    });
  }
};

export const mesCandidatures = async (req, res) => {
  try {
    const candidatures = await Candidature.find({
      candidat: req.user._id,
    }).populate("offre");

    res.json(candidatures);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllCandidatures = async (req, res) => {
  try {
    const candidatures = await Candidature.find()
      .populate("offre")
      .populate("candidat");

    res.json(candidatures);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCandidatureById = async (req, res) => {
  try {
    const candidature = await Candidature.findById(req.params.id)
      .populate("offre")
      .populate("candidat");

    if (!candidature) {
      return res.status(404).json({
        message: "Candidature introuvable",
      });
    }

    res.json(candidature);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateStatut = async (req, res) => {
  try {
    const candidature = await Candidature.findByIdAndUpdate(
      req.params.id,
      {
        statut: req.body.statut,
      },
      {
        returnDocument: "after",
      },
    );

    if (!candidature) {
      return res.status(404).json({
        message: "Candidature introuvable",
      });
    }

    res.json(candidature);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteCandidature = async (req, res) => {
  try {
    const candidature = await Candidature.findByIdAndDelete(req.params.id);

    if (!candidature) {
      return res.status(404).json({
        message: "Candidature introuvable",
      });
    }

    res.json({
      message: "Candidature supprimée avec succès",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
