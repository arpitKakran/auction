import BidState from "../models/bidModel.js";
import Auction from "../models/auctionModel.js";
import Player from "../models/playerModel.js";
import Team from "../models/teamModel.js";

/* ================= INIT BID STATE (when auction starts) ================= */
const initBidState = async (req, res) => {
  try {
    const { auctionId } = req.params;

    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    // Prevent duplicate bid state
    const existing = await BidState.findOne({ auction: auctionId });
    if (existing) {
      return res.status(400).json({ message: "Bid state already exists" });
    }

    const bidState = await BidState.create({
      auction: auctionId,
      status: "idle",
    });

    return res.status(201).json({
      message: "Bid state initialized",
      bidState,
    });
  } catch (error) {
    console.error("Init BidState Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ================= SET BIDDING TEAMS (ALWAYS 2) ================= */
const setBiddingTeams = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const { teamA, teamB } = req.body;

    if (!teamA || !teamB) {
      return res.status(400).json({ message: "Two teams required" });
    }

    const bidState = await BidState.findOne({ auction: auctionId });
    if (!bidState) {
      return res.status(404).json({ message: "Bid state not found" });
    }

    bidState.biddingTeams = [teamA, teamB];
    await bidState.save();

    return res.status(200).json({
      message: "Bidding teams set",
      biddingTeams: bidState.biddingTeams,
    });
  } catch (error) {
    console.error("Set Bidding Teams Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ================= START BIDDING FOR PLAYER ================= */
const startBiddingForPlayer = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const { playerId } = req.body;

    const bidState = await BidState.findOne({ auction: auctionId });
    if (!bidState) {
      return res.status(404).json({ message: "Bid state not found" });
    }

    const player = await Player.findById(playerId);
    if (!player || !player.isActive) {
      return res.status(404).json({ message: "Player not available" });
    }

    bidState.currentPlayer = playerId;
    bidState.currentBid = player.basePrice;
    bidState.leadingTeam = null;
    bidState.bidHistory = [];
    bidState.status = "bidding";

    await bidState.save();

    return res.status(200).json({
      message: "Bidding started",
      bidState,
    });
  } catch (error) {
    console.error("Start Bidding Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ================= PLACE BID ================= */
const placeBid = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const { teamId, amount } = req.body;

    const bidState = await BidState.findOne({ auction: auctionId });
    if (!bidState || bidState.status !== "bidding") {
      return res.status(400).json({ message: "Bidding not active" });
    }

    if (amount <= bidState.currentBid) {
      return res.status(400).json({ message: "Bid must be higher" });
    }

    bidState.currentBid = amount;
    bidState.leadingTeam = teamId;
    bidState.bidHistory.push({
      bidAmount: amount,
      team: teamId,
    });

    await bidState.save();

    return res.status(200).json({
      message: "Bid placed",
      currentBid: amount,
    });
  } catch (error) {
    console.error("Place Bid Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ================= UNDO LAST BID ================= */
const undoLastBid = async (req, res) => {
  try {
    const { auctionId } = req.params;

    const bidState = await BidState.findOne({ auction: auctionId });
    if (!bidState || bidState.bidHistory.length === 0) {
      return res.status(400).json({ message: "Nothing to undo" });
    }

    bidState.bidHistory.pop();

    const last = bidState.bidHistory.at(-1);
    bidState.currentBid = last ? last.bidAmount : null;
    bidState.leadingTeam = last ? last.team : null;

    await bidState.save();

    return res.status(200).json({
      message: "Last bid undone",
      currentBid: bidState.currentBid,
    });
  } catch (error) {
    console.error("Undo Bid Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ================= FINALIZE PLAYER (SOLD / UNSOLD) ================= */
const finalizePlayer = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const { result } = req.body; // "sold" | "unsold"

    const bidState = await BidState.findOne({ auction: auctionId });
    if (!bidState) {
      return res.status(404).json({ message: "Bid state not found" });
    }

    if (result === "sold" && !bidState.leadingTeam) {
      return res.status(400).json({ message: "No winning team" });
    }

    // Remove player from pool
    if (bidState.currentPlayer) {
      await Player.findByIdAndUpdate(bidState.currentPlayer, {
        isActive: false,
      });
    }

    bidState.status = result;
    bidState.currentPlayer = null;
    bidState.currentBid = null;
    bidState.leadingTeam = null;

    await bidState.save();

    return res.status(200).json({
      message: `Player ${result}`,
    });
  } catch (error) {
    console.error("Finalize Player Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET CURRENT BID STATE ================= */
const getBidState = async (req, res) => {
  try {
    const { auctionId } = req.params;

    const bidState = await BidState.findOne({ auction: auctionId })
      .populate("currentPlayer")
      .populate("leadingTeam")
      .populate("biddingTeams");

    if (!bidState) {
      return res.status(404).json({ message: "Bid state not found" });
    }

    return res.status(200).json({ bidState });
  } catch (error) {
    console.error("Get BidState Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export {
  initBidState,
  setBiddingTeams,
  startBiddingForPlayer,
  placeBid,
  undoLastBid,
  finalizePlayer,
  getBidState,
};
