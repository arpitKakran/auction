import mongoose from "mongoose";

const auctionPlayerSchema = new mongoose.Schema(
  {
    auction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auction",
      required: true,
    },

    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "sold", "unsold"],
      default: "pending",
    },

    soldPrice: Number,

    soldTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  },
  { timestamps: true }
);

export default mongoose.model("AuctionPlayer", auctionPlayerSchema);
