import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  createPlayer,
  getAllPlayers,
} from "../controllers/player.controllers.js";

const playerRouter = express.Router();

/* ================= CREATE PLAYER ================= */
playerRouter.post("/create", protect, createPlayer);

/* ================= GET ALL PLAYERS ================= */
playerRouter.get("/", protect, getAllPlayers);

export default playerRouter;
