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
      enum: ["live", "completed"],
      default: "live",
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
    },
  },
  { timestamps: true }
);

const Auction = mongoose.model("Auction", auctionSchema);

export default Auction;
