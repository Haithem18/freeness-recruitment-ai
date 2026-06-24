import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createOffre,
  getAllOffres,
  getOffreById,
  updateOffre,
  deleteOffre,
} from "../controllers/offreController.js";

const router = express.Router();

router.post("/", protect, createOffre);

router.get("/", getAllOffres);

router.get("/:id", getOffreById);

router.put("/:id", protect, updateOffre);

router.delete("/:id", protect, deleteOffre);

export default router;