import Auction from "../models/auctionModel.js";
import Admin from "../models/adminModel.js";
import Team from "../models/teamModel.js";

/* ================= CREATE AUCTION ================= */
const createAuction = async (req, res) => {
  try {
    const adminId = req.admin.id; // from auth middleware (later)
    const {
      name,
      teams,
      rules,
    } = req.body;

    if (!name || !teams || teams.length < 2 || !rules) {
      return res.status(400).json({
        message: "Invalid auction configuration",
      });
    }

    const auction = await Auction.create({
      name,
      owner: adminId,
      teams,
      rules,
      status: "upcoming",
    });

    // Attach auction to admin
    await Admin.findByIdAndUpdate(adminId, {
      $push: { auctions: auction._id },
    });

    return res.status(201).json({
      message: "Auction room created",
      auctionId: auction._id,
    });

  } catch (error) {
    console.error("Create Auction Error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

/* ================= GET ADMIN AUCTIONS ================= */
const getMyAuctions = async (req, res) => {
  try {
    const adminId = req.admin.id;

    const auctions = await Auction.find({ owner: adminId })
      .populate("teams", "name shortCode")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      auctions,
    });

  } catch (error) {
    console.error("Get Auctions Error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

/* ================= START AUCTION ================= */
const startAuction = async (req, res) => {
  try {
    const { auctionId } = req.params;

    const auction = await Auction.findById(auctionId);

    if (!auction) {
      return res.status(404).json({
        message: "Auction not found",
      });
    }

    if (auction.status !== "upcoming") {
      return res.status(400).json({
        message: "Auction already started or completed",
      });
    }

    auction.status = "live";
    await auction.save();

    return res.status(200).json({
      message: "Auction started",
    });

  } catch (error) {
    console.error("Start Auction Error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export { createAuction, getMyAuctions, startAuction };
