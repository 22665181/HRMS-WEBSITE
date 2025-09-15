// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import eventRoutes from "./routes/eventRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // React frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "HRMS Backend Server is running!" });
});

// ✅ Use event routes (real DB logic)
app.use("/api/events", eventRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 HRMS Backend Server running on http://localhost:${PORT}`);
  console.log(`📅 Events API: http://localhost:${PORT}/api/events`);
  console.log(`🌐 Frontend should connect to: http://localhost:${PORT}`);
});

// Handle server errors
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});
