import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  postuler,
  mesCandidatures,
  getAllCandidatures,
  getCandidatureById,
  updateStatut,
  deleteCandidature,
} from "../controllers/candidatureController.js";

const router = express.Router();

router.get("/", getAllCandidatures);

router.get("/me", protect, mesCandidatures);

router.get("/:id", getCandidatureById);

router.post("/", protect, postuler);

router.put(
  "/:id/status",
  protect,
  updateStatut
);

router.delete(
  "/:id",
  protect,
  deleteCandidature
);

export default router;