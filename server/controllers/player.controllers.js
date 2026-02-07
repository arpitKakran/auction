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
      imageUrl,
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

/* ================= GET PLAYERS BY ROLE ================= */
const getPlayersByRole = async (req, res) => {
  try {
    const { role } = req.query;

    const filter = {
      isActive: true,
    };

    if (role && role !== "all") {
      filter.role = role;
    }

    const players = await Player.find(filter);

    return res.status(200).json({
      players,
    });
  } catch (error) {
    console.error("Get Players Error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

/* ================= GET RANDOM PLAYER ================= */
const getRandomPlayer = async (req, res) => {
  try {
    const { role } = req.query;

    const filter = {
      isActive: true,
    };

    if (role && role !== "all") {
      filter.role = role;
    }

    const count = await Player.countDocuments(filter);

    if (count === 0) {
      return res.status(404).json({
        message: "No players available",
      });
    }

    const random = Math.floor(Math.random() * count);

    const player = await Player.findOne(filter).skip(random);

    return res.status(200).json({
      player,
    });
  } catch (error) {
    console.error("Random Player Error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

/* ================= DEACTIVATE PLAYER ================= */
const deactivatePlayer = async (req, res) => {
  try {
    const { playerId } = req.params;

    const player = await Player.findById(playerId);

    if (!player) {
      return res.status(404).json({
        message: "Player not found",
      });
    }

    player.isActive = false;
    await player.save();

    return res.status(200).json({
      message: "Player removed from pool",
    });
  } catch (error) {
    console.error("Deactivate Player Error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export {
  createPlayer,
  getPlayersByRole,
  getRandomPlayer,
  deactivatePlayer,
};
