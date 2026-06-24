import mongoose from "mongoose";

const profilSchema = new mongoose.Schema(
  {
    candidat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    competences: [
      {
        nom: String,
        niveau: {
          type: String,
          enum: [
            "DEBUTANT",
            "INTERMEDIAIRE",
            "AVANCE",
            "EXPERT",
          ],
        },
      },
    ],

    experiences: [
      {
        poste: String,
        entreprise: String,
        dateDebut: Date,
        dateFin: Date,
      },
    ],

    formations: [
      {
        etablissement: String,
        diplome: String,
        dateObtention: Date,
      },
    ],

    langues: [
      {
        nom: String,
        niveau: {
          type: String,
          enum: [
            "DEBUTANT",
            "INTERMEDIAIRE",
            "AVANCE",
            "COURANT",
          ],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Profil",
  profilSchema
);