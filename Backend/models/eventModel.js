import pool from "../config/database.js"

export const createEvent = async (eventData) => {
  const {
    title,
    date,
    start_time,
    duration,
    timezone,
    mode_of_event,
    organizer,
    meeting_link,
    location,
    organizer_email,
  } = eventData

  console.log("💾 Creating event with data:", eventData)

  // Use correct column names that match the database schema
  const insertQuery = `
    INSERT INTO events 
      (title, organizer, organizer_email, date, start_time, duration, timezone, mode_of_event, location, meeting_link, conference_details) 
    VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
    RETURNING *;
  `

  const values = [
    title || "Untitled Event",
    organizer || "Unknown Organizer",
    organizer_email || "organizer@example.com",
    date || new Date().toISOString(),
    start_time || "09:00",
    duration || 60,
    timezone || "UTC",
    mode_of_event || "online",
    location || "Virtual",
    meeting_link || "",
    `Mode: ${mode_of_event || "online"}${meeting_link ? ", Link: " + meeting_link : ""}`,
  ]

  console.log("💾 Inserting event with values:", values)

  try {
    const result = await pool.query(insertQuery, values)
    const createdEvent = result.rows[0]

    console.log("✅ Event created successfully:", createdEvent)
    return createdEvent
  } catch (error) {
    console.error("❌ Database error creating event:", error)
    throw error
  }
}

export const getAllEvents = async () => {
  try {
    const selectQuery = `SELECT * FROM events ORDER BY date ASC`
    const result = await pool.query(selectQuery)

    console.log(`📋 Found ${result.rows.length} events`)
    return result.rows
  } catch (error) {
    console.error("❌ Database error fetching events:", error)
    throw error
  }
}
