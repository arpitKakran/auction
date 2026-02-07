import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    status: {
      type: String,
      enum: ["upcoming", "live", "paused", "completed"],
      default: "upcoming",
    },

    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],

    rules: {
      maxPlayersPerTeam: {
        type: Number,
        required: true,
      },

      pursePerTeam: {
        type: Number,
        required: true,
      },

      minBasePrice: {
        type: Number,
        required: true,
      },

      allowedCategories: {
        type: [String],
        default: ["all"],
      },
    },
  },
  {
    timestamps: true,
  }
);

const Auction = mongoose.model("Auction", auctionSchema);
export default Auction;
