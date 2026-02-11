import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  createAuction,
  getMyAuctions,
  getAuctionById,
} from "../controllers/auction.controllers.js";

const router = express.Router();

router.post("/create", protect, createAuction);
router.get("/my-auctions", protect, getMyAuctions);
router.get("/:auctionId", protect, getAuctionById);

export default router;
