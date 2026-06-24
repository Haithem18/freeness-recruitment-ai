import Offre from "../models/Offre.js";
import Profil from "../models/Profil.js";
import {
  calculateMatchScore,
} from "../services/recommendationService.js";

const niveauMatch = (score) => {
  if (score >= 80) {
    return "Excellent Match";
  }

  if (score >= 60) {
    return "Bon Match";
  }

  if (score >= 40) {
    return "Match Moyen";
  }

  return "Faible Match";
};

export const getRecommendations = async (
  req,
  res
) => {
  try {
    const offre = await Offre.findById(
      req.params.offreId
    );

    if (!offre) {
      return res.status(404).json({
        message: "Offre introuvable",
      });
    }

    const profils = await Profil.find()
      .populate(
        "candidat",
        "name email"
      );

    const results = profils.map(
      (profil) => {
        const score =
          calculateMatchScore(
            profil,
            offre
          );

        return {
          candidat:
            profil.candidat,
          score,
          niveau:
            niveauMatch(score),
        };
      }
    );

    results.sort(
      (a, b) =>
        b.score - a.score
    );

    res.json(results);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};