import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  createPlayer,
  getPlayersByRole,
  getRandomPlayer,
  deactivatePlayer,
} from "../controllers/player.controllers.js";

const router = express.Router();

router.post("/create", protect, createPlayer);
router.get("/", protect, getPlayersByRole);
router.get("/random", protect, getRandomPlayer);
router.patch("/deactivate/:playerId", protect, deactivatePlayer);

export default router;
