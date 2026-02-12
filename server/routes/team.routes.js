import express from "express";
import {
  createTeams,
  getAuctionTeams,
  getTeamPurseStatus,
} from "../controllers/team.controllers.js";
import protect  from "../middleware/auth.middleware.js";

const teamRouter = express.Router();
teamRouter.post("/create/:auctionId",protect,createTeams);
teamRouter.get("/:auctionId",protect,getAuctionTeams);
teamRouter.get("/:auctionId/purse",protect,getTeamPurseStatus);

export default teamRouter;