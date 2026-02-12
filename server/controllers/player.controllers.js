import Player from "../models/playerModel.js";

/* ================= CREATE PLAYER ================= */
const createPlayer = async (req, res) => {
  try {
    const {
      name,
      role,
      batting,
      bowling,
      keeping,
      basePrice,
      imageUrl,
    } = req.body;

    if (!name || !role || !batting || !bowling || !keeping || !basePrice) {
      return res.status(400).json({
        message: "All player fields are required",
      });
    }

    const player = await Player.create({
      name,
      role,
      batting,
      bowling,
      keeping,
      basePrice,
      imageUrl, // example: "/player-images/kohli.png"
    });

    return res.status(201).json({
      message: "Player created",
      player,
    });
  } catch (error) {
    console.error("Create Player Error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

/* ================= GET ALL PLAYERS ================= */
const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    return res.status(200).json({ players });
  } catch (error) {
    console.error("Get Players Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export { createPlayer, getAllPlayers };
