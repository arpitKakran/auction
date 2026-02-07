import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    shortCode: {
      type: String,
      required: true,
      uppercase: true,
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
        ref: "Player",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Team", teamSchema);
