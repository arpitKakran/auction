import mongoose from "mongoose";

const globalTeamSchema = new mongoose.Schema({
  shortCode: {
    type: String,
    required: true,
    uppercase: true,
    unique: true, // RCB, MI, CSK
  },
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
});

const GlobalTeam = mongoose.model("GlobalTeam", globalTeamSchema);
export default GlobalTeam;
