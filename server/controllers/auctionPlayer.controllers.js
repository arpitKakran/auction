import AuctionPlayer from "../models/auctionPlayerModel.js";

/* ================= GET RANDOM PLAYER (CATEGORY WISE) ================= */
const getRandomAuctionPlayer = async (req, res) => {
  try {
    const { auctionId, role } = req.query;

    const filter = {
      auction: auctionId,
      status: "pending",
    };

    const players = await AuctionPlayer.find(filter).populate("player");

    if (!players.length) {
      return res.status(404).json({
        message: "No players left",
      });
    }

    // Filter by role if provided
    const roleFiltered =
      role && role !== "all"
        ? players.filter((p) => p.player.role === role)
        : players;

    if (!roleFiltered.length) {
      return res.status(404).json({
        message: "No players in this category",
      });
    }

    const randomIndex = Math.floor(Math.random() * roleFiltered.length);
    const selected = roleFiltered[randomIndex];

    return res.status(200).json({
      auctionPlayer: selected,
    });
  } catch (error) {
    console.error("Random Auction Player Error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export { getRandomAuctionPlayer };
