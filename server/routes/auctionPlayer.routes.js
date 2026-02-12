import express from "express";
import protect from "../middleware/auth.middleware.js";
import { getRandomAuctionPlayer } from "../controllers/auctionPlayer.controllers.js";

const auctionPlayerRouter = express.Router();

auctionPlayerRouter.get("/random", protect, getRandomAuctionPlayer);

export default auctionPlayerRouter;
