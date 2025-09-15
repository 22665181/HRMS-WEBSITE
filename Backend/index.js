// Simple server startup file
import express from "express"
import cors from "cors"
import dotenv from "dotenv"

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
// const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
)
app.use(express.json())

// Test route
app.get("/", (req, res) => {
  res.json({ message: "HRMS Backend Server is running!" })
})

// Basic events route for testing
app.get("/api/events", (req, res) => {
  res.json({
    message: "Events endpoint working",
    events: [],
  })
})

app.post("/api/events", (req, res) => {
  console.log("Received event data:", req.body)
  res.json({
    message: "Event created successfully",
    event: req.body,
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 HRMS Backend Server running on http://localhost:${PORT}`)
  console.log(`📅 Events API: http://localhost:${PORT}/api/events`)
  console.log(`🌐 Frontend should connect to: http://localhost:${PORT}`)
})

// Handle server errors
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err)
})

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err)
})
