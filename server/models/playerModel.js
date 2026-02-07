import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["batter", "bowler", "allrounder", "wicketkeeper"],
      required: true,
    },

    batting: {
      type: Number,
      min: 1,
      max: 100,
      required: true,
    },

    bowling: {
      type: Number,
      min: 1,
      max: 100,
      required: true,
    },

    keeping: {
      type: Number,
      min: 1,
      max: 100,
      required: true,
    },

    basePrice: {
      type: Number,
      required: true,
    },

    imageUrl: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Player = mongoose.model("Player", playerSchema);
export default Player;
