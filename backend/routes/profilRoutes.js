import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getMyProfil } from "../controllers/profilController.js";

const router = express.Router();

router.get("/me", protect, getMyProfil);

export default router;
