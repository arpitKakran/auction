import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    globalTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GlobalTeam",
      required: true,
    },

    auction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auction",
      required: true,
    },

    totalPurse: {
      type: Number,
      required: true,
    },

    remainingPurse: {
      type: Number,
      required: true,
    },

    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AuctionPlayer",
      },
    ],
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);

export default Team;
