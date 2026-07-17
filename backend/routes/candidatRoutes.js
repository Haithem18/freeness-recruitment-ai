import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createCandidat,
  getCandidats,
  createProfil,
  getMyProfil,
  getStats,
} from "../controllers/candidatController.js";

const router = express.Router();

// Gestion des candidats
router.post("/", protect, createCandidat);
router.get("/", getCandidats);

// Gestion du profil
router.post("/profil", protect, createProfil);
router.get("/profil", protect, getMyProfil);
router.get("/stats", protect, getStats);
export default router;
