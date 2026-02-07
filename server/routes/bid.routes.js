import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  initBidState,
  setBiddingTeams,
  startBiddingForPlayer,
  placeBid,
  undoLastBid,
  finalizePlayer,
  getBidState,
} from "../controllers/bid.controllers.js";

const router = express.Router();

/**
 * INIT BID STATE (when auction starts)
 * POST /api/bidstate/init/:auctionId
 */
router.post("/init/:auctionId", protect, initBidState);

/**
 * SET 2 BIDDING TEAMS
 * POST /api/bidstate/teams/:auctionId
 */
router.post("/teams/:auctionId", protect, setBiddingTeams);

/**
 * START BIDDING FOR A PLAYER
 * POST /api/bidstate/start/:auctionId
 */
router.post("/start/:auctionId", protect, startBiddingForPlayer);

/**
 * PLACE A BID
 * POST /api/bidstate/bid/:auctionId
 */
router.post("/bid/:auctionId", protect, placeBid);

/**
 * UNDO LAST BID
 * POST /api/bidstate/undo/:auctionId
 */
router.post("/undo/:auctionId", protect, undoLastBid);

/**
 * FINALIZE PLAYER (SOLD / UNSOLD)
 * POST /api/bidstate/finalize/:auctionId
 */
router.post("/finalize/:auctionId", protect, finalizePlayer);

/**
 * GET CURRENT BID STATE (for UI / resume)
 * GET /api/bidstate/:auctionId
 */
router.get("/:auctionId", protect, getBidState);

export default router;
