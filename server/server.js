import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// PUBLIC TEST ROUTE
app.get("/", (req, res) => {
  res.send("Dhan Dhan Satguru Tera Hi Aasra");
});

// DO NOT add auth middleware yet

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
