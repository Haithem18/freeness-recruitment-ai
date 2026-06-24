import Offre from "../models/Offre.js";

export const createOffre = async (req, res) => {
  try {
    const offre = await Offre.create({
      ...req.body,
      recruteur: req.user._id,
    });

    res.status(201).json(offre);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllOffres = async (req, res) => {
  try {
    const offres = await Offre.find()
      .populate("recruteur", "name email");

    res.json(offres);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getOffreById = async (req, res) => {
  try {
    const offre = await Offre.findById(req.params.id);

    if (!offre) {
      return res.status(404).json({
        message: "Offre introuvable",
      });
    }

    res.json(offre);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateOffre = async (req, res) => {
  try {
    const offre = await Offre.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!offre) {
      return res.status(404).json({
        message: "Offre introuvable",
      });
    }

    res.json(offre);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteOffre = async (req, res) => {
  try {
    const offre = await Offre.findByIdAndDelete(
      req.params.id
    );

    if (!offre) {
      return res.status(404).json({
        message: "Offre introuvable",
      });
    }

    res.json({
      message: "Offre supprimée avec succès",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};