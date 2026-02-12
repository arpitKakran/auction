import Auction from "../models/auctionModel.js";
import Team from "../models/teamModel.js";
import GlobalTeam from "../models/globalTeamModel.js";
import Admin from "../models/adminModel.js";
import Player from "../models/playerModel.js";
import AuctionPlayer from "../models/auctionPlayerModel.js";

/* ================= CREATE AUCTION ================= */
const createAuction = async (req, res) => {
  try {
    const adminId = req.admin.id;
    const { name, teamShortCodes, rules } = req.body;

    if (
      !name ||
      !teamShortCodes?.length ||
      teamShortCodes.length < 2 ||
      !rules?.maxPlayersPerTeam ||
      !rules?.pursePerTeam
    ) {
      return res.status(400).json({
        message: "Invalid auction configuration",
      });
    }

    // Create auction
    const auction = await Auction.create({
      name,
      owner: adminId,
      rules,
      status: "live",
    });

    // Fetch global teams
    const globalTeams = await GlobalTeam.find({
      shortCode: { $in: teamShortCodes },
    });

    if (globalTeams.length !== teamShortCodes.length) {
      return res.status(400).json({
        message: "Invalid teams selected",
      });
    }

    // Create auction teams
    const auctionTeams = await Team.insertMany(
      globalTeams.map((gt) => ({
        globalTeam: gt._id,
        auction: auction._id,
        totalPurse: rules.pursePerTeam,
        remainingPurse: rules.pursePerTeam,
        players: [],
      }))
    );

    auction.teams = auctionTeams.map((t) => t._id);
    await auction.save();

    await Admin.findByIdAndUpdate(adminId, {
      $push: { auctions: auction._id },
    });

    /* ================= CREATE AUCTION PLAYER POOL ================= */

    const players = await Player.find();

    if (players.length === 0) {
      return res.status(400).json({
        message: "No players available. Create players first.",
      });
    }

    await AuctionPlayer.insertMany(
      players.map((p) => ({
        auction: auction._id,
        player: p._id,
      }))
    );

    return res.status(201).json({
      message: "Auction created",
      auctionId: auction._id,
    });
  } catch (err) {
    console.error("Create Auction Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET AUCTION BY ID ================= */
const getAuctionById = async (req, res) => {
  try {
    const { auctionId } = req.params;

    const auction = await Auction.findById(auctionId).populate({
      path: "teams",
      populate: {
        path: "globalTeam",
        select: "shortCode name logo",
      },
    });

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    return res.status(200).json({ auction });
  } catch (err) {
    console.error("Get Auction Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET ADMIN AUCTIONS ================= */
const getMyAuctions = async (req, res) => {
  try {
    const adminId = req.admin.id;

    const auctions = await Auction.find({ owner: adminId })
      .populate({
        path: "teams",
        populate: {
          path: "globalTeam",
          select: "shortCode name logo",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({ auctions });
  } catch (err) {
    console.error("Get My Auctions Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export { createAuction, getAuctionById, getMyAuctions };
