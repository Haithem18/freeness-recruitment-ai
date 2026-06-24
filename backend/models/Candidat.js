import mongoose from "mongoose";

const candidatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    nom: {
      type: String,
      required: true,
    },

    prenom: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    telephone: {
      type: String,
      default: "",
    },

    profilComplet: {
      type: Boolean,
      default: false,
    },

    profil: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profil",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Candidat",
  candidatSchema
);