import express from 'express';
import cors from "cors"
import dotenv from "dotenv"
import eventRoutes from "./routes/event.js"
import pool from "./config/db.js"
import createEventTable from './data/createEventTable.js';


dotenv.config()


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Create Table if not exists 
createEventTable()


app.get('/', async(req, res)=>{
  const result = await pool.query("SELECT current_database()");
  res.send(`The database name is ${result.rows[0].current_database}`)
})

// Routes
app.use('/api/events', eventRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});