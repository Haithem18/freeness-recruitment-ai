import mongoose from "mongoose";

const candidatureSchema = new mongoose.Schema(
  {
    candidat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidat",
      required: true,
    },

    offre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offre",
      required: true,
    },

    dateCandidature: {
      type: Date,
      default: Date.now,
    },

    statut: {
      type: String,
      enum: [
        "EN_ATTENTE",
        "ACCEPTEE",
        "REFUSEE"
      ],
      default: "EN_ATTENTE",
    },

    lettreMotivation: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Candidature",
  candidatureSchema
);