// db.js
import dotenv from "dotenv";
dotenv.config(); // ⬅ yaha bhi safe side pe

import pkg from "pg";
const { Pool } = pkg;

console.log("🔍 PG_USER:", process.env.PG_USER);
console.log("🔍 PG_PASSWORD:", process.env.PG_PASSWORD);

const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT
});

pool.connect()
  .then(() => console.log(" PostgreSQL connected"))
  .catch(err => console.error("❌ PostgreSQL connection error:", err));

export default pool;

