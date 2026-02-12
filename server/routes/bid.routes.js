import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  nextPlayer,
  markSold,
  markUnsold,
  setBiddingTeams,
  incrementBid,
  getBidStateByAuction
} from "../controllers/bid.controllers.js";

const bidStateRouter = express.Router();

bidStateRouter.post("/next", protect, nextPlayer);
bidStateRouter.post("/sold", protect, markSold);
bidStateRouter.post("/unsold", protect, markUnsold);
bidStateRouter.post("/increment", protect, incrementBid);
bidStateRouter.post("/set-teams", protect, setBiddingTeams);
bidStateRouter.get("/:auctionId", protect, getBidStateByAuction);

export default bidStateRouter;
