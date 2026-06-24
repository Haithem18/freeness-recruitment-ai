import User from "../models/User.js";
import Offre from "../models/Offre.js";
import Candidature from "../models/Candidature.js";
import Profil from "../models/Profil.js";

export const getStats = async (
  req,
  res
) => {
  try {
    const users =
      await User.countDocuments();

    const offres =
      await Offre.countDocuments();

    const candidatures =
      await Candidature.countDocuments();

    const profils =
      await Profil.countDocuments();

    res.json({
      users,
      offres,
      candidatures,
      profils,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};