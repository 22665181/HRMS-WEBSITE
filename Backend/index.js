// Backend/index.js
import dotenv from "dotenv";
dotenv.config(); // ✅ sabse upar

import express from "express";
import cors from "cors";
import pool from "./db.js"; // PostgreSQL connection pool
import recognitionRoutes from "./routes/recognitionRoutes.js"; // Custom route file

const app = express(); // Initialize express app

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ DB test route
app.get("/api/db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, server_time: result.rows[0].now });
  } catch (err) {
    console.error("Database test error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Recognition routes mounted here (singular, to match frontend)
app.use("/api/recognition", recognitionRoutes);

// ✅ 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
