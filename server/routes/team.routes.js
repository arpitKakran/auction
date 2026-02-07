import express from "express";
import {
  createTeams,
  getAuctionTeams,
  getTeamPurseStatus,
} from "../controllers/team.controllers.js";
import protect  from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/create/:auctionId",protect,createTeams);
router.get("/:auctionId",protect,getAuctionTeams);
router.get("/:auctionId/purse",protect,getTeamPurseStatus);

export default router;