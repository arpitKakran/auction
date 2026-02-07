import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  createAuction,
  getMyAuctions,
  startAuction,
} from "../controllers/auction.controllers.js";

const router = express.Router();

router.post("/create", protect, createAuction);
router.get("/my-auctions", protect, getMyAuctions);
router.post("/start/:auctionId", protect, startAuction);

export default router;
