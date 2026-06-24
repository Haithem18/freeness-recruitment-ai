import mongoose from "mongoose";

const offreSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    lieu: {
      type: String,
      required: true,
    },

    typeContrat: {
      type: String,
      enum: ["CDI", "CDD", "STAGE", "FREELANCE"],
      required: true,
    },

    competencesRequises: [
      {
        nom: String,
        niveau: String,
      },
    ],

    recruteur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    datePublication: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Offre", offreSchema);