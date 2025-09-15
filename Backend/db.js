import pool from "./database.js"

app.post("/api/events", async (req, res) => {
  try {
    const { title, date, start_time, duration, timezone, type, organizer, link } = req.body

    const result = await pool.query(
      `INSERT INTO events (title, date, start_time, duration, timezone, type, organizer, link) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [title, date, start_time, duration, timezone, type, organizer, link]
    )

    res.json({
      message: "Event created successfully",
      event: result.rows[0],
    })
  } catch (err) {
    console.error("Error inserting event:", err)
    res.status(500).json({ error: "Failed to create event" })
  }
})
