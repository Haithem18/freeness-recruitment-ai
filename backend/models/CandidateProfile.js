import mongoose from "mongoose";

const candidateProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "",
    },

    skills: [
      {
        name: String,
        level: String,
      },
    ],

    experiences: [
      {
        company: String,
        position: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],

    educations: [
      {
        school: String,
        degree: String,
        field: String,
        graduationYear: Number,
      },
    ],

    languages: [
      {
        name: String,
        level: String,
      },
    ],

    cvUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "CandidateProfile",
  candidateProfileSchema
);