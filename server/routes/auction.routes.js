import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  createAuction,
  getMyAuctions,
  getAuctionById,
} from "../controllers/auction.controllers.js";

const auctionRouter = express.Router();

auctionRouter.post("/create", protect, createAuction);
auctionRouter.get("/my-auctions", protect, getMyAuctions);
auctionRouter.get("/:auctionId", protect, getAuctionById);

export default auctionRouter;
