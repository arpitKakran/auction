import mongoose from "mongoose";

const bidStateSchema = new mongoose.Schema(
  {
    auction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auction",
      required: true,
      unique: true,
    },

    currentPlayer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      default: null,
    },

    biddingTeams: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Team",
        },
      ],
     validate: {
  validator: v => v.length === 0 || v.length === 2,
  message: "Bidding teams must be empty or exactly 2",
},

    },

    currentBid: {
      type: Number,
      default: null,
    },

    leadingTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      default: null,
    },

    bidHistory: [
      {
        bidAmount: Number,
        team: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Team",
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    status: {
      type: String,
      enum: ["idle", "bidding", "paused", "sold", "unsold"],
      default: "idle",
    },
  },
  { timestamps: true }
);

const bidState = mongoose.model("BidState", bidStateSchema);

export default bidState