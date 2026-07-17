import Profil from "../models/Profil.js";

export const getMyProfil = async (req, res) => {
  try {
    let profil = await Profil.findOne({ candidat: req.user._id }).populate(
      "candidat",
      "name email",
    );

    // If the candidate hasn't created a profil yet, return an empty shell
    if (!profil) {
      return res.json({
        candidat: { name: req.user.name, email: req.user.email },
        competences: [],
        experiences: [],
        formations: [],
        langues: [],
      });
    }

    res.json(profil);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
