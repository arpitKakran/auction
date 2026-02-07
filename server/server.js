import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import auctionRouter from "./routes/auction.routes.js";
import "./models/teamModel.js";
import playerRouter from "./routes/player.routes.js";
import bidStateRouter from "./routes/bid.routes.js";
import teamRoutes from "./routes/team.routes.js";



dotenv.config();

const app = express();

// DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/auction", auctionRouter);
app.use("/api/player", playerRouter);
app.use("/api/bidstate", bidStateRouter);
app.use("/api/team", teamRoutes);

// Public test route
app.get("/", (req, res) => {
  res.send("Dhan Dhan Satguru Tera Hi Aasra");
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
