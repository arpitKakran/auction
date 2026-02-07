import Team from "../models/teamModel.js";
import Auction from "../models/auctionModel.js";

/* ================= CREATE TEAMS FOR AUCTION ================= */
const createTeams = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const { teams, pursePerTeam } = req.body;

    if (!teams || teams.length < 2 || !pursePerTeam) {
      return res.status(400).json({ message: "Invalid team setup" });
    }

    const auction = await Auction.findById(auctionId);
    if (!auction || auction.status !== "upcoming") {
      return res.status(400).json({ message: "Auction not configurable" });
    }

    const teamDocs = teams.map((team) => ({
      name: team.name,
      shortCode: team.shortCode,
      auction: auctionId,
      totalPurse: pursePerTeam,
      remainingPurse: pursePerTeam,
    }));

    const createdTeams = await Team.insertMany(teamDocs);

    auction.teams = createdTeams.map((t) => t._id);
    await auction.save();

    return res.status(201).json({
      message: "Teams created",
      teams: createdTeams,
    });
  } catch (error) {
    console.error("Create Teams Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET TEAMS OF AUCTION ================= */
const getAuctionTeams = async (req, res) => {
  try {
    const { auctionId } = req.params;

    const teams = await Team.find({ auction: auctionId })
      .select("name shortCode remainingPurse totalPurse players");

    return res.status(200).json({ teams });
  } catch (error) {
    console.error("Get Teams Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET PURSE STATUS (RIGHT PANEL) ================= */
const getTeamPurseStatus = async (req, res) => {
  try {
    const { auctionId } = req.params;

    const teams = await Team.find({ auction: auctionId })
      .select("name shortCode remainingPurse totalPurse");

    return res.status(200).json({ teams });
  } catch (error) {
    console.error("Purse Status Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= ASSIGN PLAYER TO TEAM (INTERNAL USE) ================= */
const assignPlayerToTeam = async (teamId, playerId, price) => {
  await Team.findByIdAndUpdate(teamId, {
    $push: { players: playerId },
    $inc: { remainingPurse: -price },
  });
};

export {
  createTeams,
  getAuctionTeams,
  getTeamPurseStatus,
  assignPlayerToTeam,
};
