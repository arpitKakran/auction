import BidState from "../models/bidModel.js";
import AuctionPlayer from "../models/auctionPlayerModel.js";
import Team from "../models/teamModel.js";

/* ================= NEXT PLAYER ================= */
const nextPlayer = async (req, res) => {
  try {
    const { auctionId, role } = req.body;

    const players = await AuctionPlayer.find({
      auction: auctionId,
      status: "pending",
    }).populate("player");

    if (!players.length) {
      return res.status(404).json({
        message: "No players left in this auction",
      });
    }

    const filtered =
      role && role !== "all"
        ? players.filter((p) => p.player.role === role)
        : players;

    if (!filtered.length) {
      return res.status(404).json({
        message: "No players in this category",
      });
    }

    const randomIndex = Math.floor(Math.random() * filtered.length);
    const selected = filtered[randomIndex];

    let bidState = await BidState.findOne({ auction: auctionId });

    if (!bidState) {
      bidState = await BidState.create({ auction: auctionId });
    }

    bidState.currentPlayer = selected._id;
    bidState.currentBid = selected.player.basePrice;
    bidState.leadingTeam = null;
    bidState.bidHistory = [];
    bidState.status = "bidding";

    await bidState.save();

    return res.status(200).json({
      message: "Next player selected",
      auctionPlayer: selected,
    });
  } catch (error) {
    console.error("Next Player Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ================= INCREMENT BID ================= */
const incrementBid = async (req, res) => {
  try {
    const { auctionId, teamId, increment } = req.body;

    const allowedIncrements = [1000000, 2000000, 2500000];

    if (!allowedIncrements.includes(increment)) {
      return res.status(400).json({
        message: "Invalid increment amount",
      });
    }

    const bidState = await BidState.findOne({ auction: auctionId });

    if (!bidState || bidState.status !== "bidding") {
      return res.status(400).json({
        message: "No active bidding",
      });
    }

    if (!bidState.biddingTeams || bidState.biddingTeams.length !== 2) {
      return res.status(400).json({
        message: "Select two bidding teams first",
      });
    }

    // FIXED ObjectId comparison
    const isAllowedTeam = bidState.biddingTeams.some(
      (t) => t.toString() === teamId
    );

    if (!isAllowedTeam) {
      return res.status(400).json({
        message: "This team cannot bid",
      });
    }

    // Prevent same team bidding consecutively
    if (
      bidState.leadingTeam &&
      bidState.leadingTeam.toString() === teamId
    ) {
      return res.status(400).json({
        message: "Same team cannot bid consecutively",
      });
    }

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({
        message: "Team not found",
      });
    }

    const newBid = bidState.currentBid + increment;

    if (team.remainingPurse < newBid) {
      return res.status(400).json({
        message: "Insufficient purse",
      });
    }

    bidState.currentBid = newBid;
    bidState.leadingTeam = teamId;

    bidState.bidHistory.push({
      bidAmount: newBid,
      team: teamId,
    });

    await bidState.save();

    return res.status(200).json({
      message: "Bid updated",
      currentBid: newBid,
      leadingTeam: teamId,
    });
  } catch (error) {
    console.error("Increment Error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

/* ================= SOLD PLAYER ================= */
const markSold = async (req, res) => {
  try {
    const { auctionId } = req.body;

    const bidState = await BidState.findOne({ auction: auctionId });

    if (!bidState || !bidState.currentPlayer) {
      return res.status(400).json({
        message: "No active player",
      });
    }

    if (!bidState.leadingTeam) {
      return res.status(400).json({
        message: "No team has placed a bid",
      });
    }

    const auctionPlayer = await AuctionPlayer.findById(
      bidState.currentPlayer
    );

    auctionPlayer.status = "sold";
    auctionPlayer.soldPrice = bidState.currentBid;
    auctionPlayer.soldTo = bidState.leadingTeam;
    await auctionPlayer.save();

    const team = await Team.findById(bidState.leadingTeam);
    team.remainingPurse -= bidState.currentBid;
    team.players.push(auctionPlayer.player);
    await team.save();

    // FULL RESET
    bidState.status = "idle";
    bidState.currentPlayer = null;
    bidState.currentBid = null;
    bidState.leadingTeam = null;
    bidState.bidHistory = [];

    await bidState.save();

    return res.status(200).json({
      message: "Player sold successfully",
    });
  } catch (error) {
    console.error("Sold Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ================= UNSOLD PLAYER ================= */
const markUnsold = async (req, res) => {
  try {
    const { auctionId } = req.body;

    const bidState = await BidState.findOne({ auction: auctionId });

    if (!bidState || !bidState.currentPlayer) {
      return res.status(400).json({
        message: "No active player",
      });
    }

    const auctionPlayer = await AuctionPlayer.findById(
      bidState.currentPlayer
    );

    auctionPlayer.status = "unsold";
    await auctionPlayer.save();

    // FULL RESET
    bidState.status = "idle";
    bidState.currentPlayer = null;
    bidState.currentBid = null;
    bidState.leadingTeam = null;
    bidState.bidHistory = [];

    await bidState.save();

    return res.status(200).json({
      message: "Player marked unsold",
    });
  } catch (error) {
    console.error("Unsold Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ================= SET BIDDING TEAMS ================= */
const setBiddingTeams = async (req, res) => {
  try {
    const { auctionId, teamA, teamB } = req.body;

    if (!teamA || !teamB || teamA === teamB) {
      return res.status(400).json({
        message: "Two different teams required",
      });
    }

    let bidState = await BidState.findOne({ auction: auctionId });

    if (!bidState) {
      bidState = await BidState.create({ auction: auctionId });
    }

    bidState.biddingTeams = [teamA, teamB];
    await bidState.save();

    return res.status(200).json({
      message: "Bidding teams updated",
    });
  } catch (error) {
    console.error("Set Bidding Teams Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET BID STATE ================= */
const getBidStateByAuction = async (req, res) => {
  try {
    const { auctionId } = req.params;

    const bidState = await BidState.findOne({ auction: auctionId })
      .populate({
        path: "leadingTeam",
        populate: {
          path: "globalTeam",
          select: "logo shortCode",
        },
      })
      .populate({
        path: "currentPlayer",
        populate: {
          path: "player",
        },
      });

    return res.status(200).json({ bidState });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export {
  nextPlayer,
  incrementBid,
  markSold,
  markUnsold,
  setBiddingTeams,
  getBidStateByAuction,
};
