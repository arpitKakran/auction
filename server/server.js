import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRouter from "./routes/auth.routes.js";
import auctionRouter from "./routes/auction.routes.js";
import playerRouter from "./routes/player.routes.js";
import bidStateRouter from "./routes/bid.routes.js";
import teamRouter from "./routes/team.routes.js";
import auctionPlayerRouter from "./routes/auctionPlayer.routes.js";

dotenv.config();

const app = express();

// DB
await connectDB();

// ✅ CORS — THIS WAS MISSING
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/auction", auctionRouter);
app.use("/api/player", playerRouter);
app.use("/api/bidstate", bidStateRouter);
app.use("/api/team", teamRouter);
app.use("/api/auction-player",auctionPlayerRouter);

// Test
app.get("/", (req, res) => {
  res.send("Dhan Dhan Satguru Tera Hi Aasra");
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
