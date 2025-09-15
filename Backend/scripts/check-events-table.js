import pool from "../config/database.js"

console.log("🔍 Checking events table structure...")

try {
  // Check if events table exists and get its structure
  const tableCheck = await pool.query(`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_name = 'events'
    );
  `)

  if (!tableCheck.rows[0].exists) {
    console.log("❌ Events table does not exist. Creating it...")

    // Create events table with proper structure
    await pool.query(`
      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        organizer VARCHAR(255),
        organizer_email VARCHAR(255),
        date TIMESTAMP NOT NULL,
        start_time TIME,
        duration INTEGER,
        timezone VARCHAR(100),
        mode_of_event VARCHAR(50),
        location TEXT,
        meeting_link TEXT,
        conference_details TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    console.log("✅ Events table created successfully!")
  } else {
    console.log("✅ Events table exists. Checking structure...")
  }

  // Get column information
  const result = await pool.query(`
    SELECT column_name, data_type, is_nullable, column_default
    FROM information_schema.columns 
    WHERE table_name = 'events' 
    ORDER BY ordinal_position
  `)

  console.log("\n📋 Events table structure:")
  result.rows.forEach((row) => {
    console.log(
      `- ${row.column_name} (${row.data_type}) ${row.is_nullable === "NO" ? "NOT NULL" : "NULLABLE"} ${row.column_default ? `DEFAULT ${row.column_default}` : ""}`,
    )
  })

  // Test insert to see what works
  console.log("\n🧪 Testing a sample insert...")
  const testInsert = await pool.query(
    `
    INSERT INTO events (title, organizer, date, duration, timezone, mode_of_event, location) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) 
    RETURNING *;
  `,
    ["Test Event", "Test Organizer", new Date().toISOString(), 60, "UTC", "online", "Virtual"],
  )

  console.log("✅ Test insert successful:", testInsert.rows[0])

  // Clean up test data
  await pool.query("DELETE FROM events WHERE title = $1", ["Test Event"])
  console.log("🧹 Test data cleaned up")
} catch (err) {
  console.error("❌ Error:", err.message)
  console.error("Full error:", err)
} finally {
  await pool.end()
  console.log("🔌 Connection closed.")
}
