import pool from "../config/db.js";


const createEventTable =  async()=>{
    const queryText = `
    CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    created_by INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INTEGER,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    event_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )

    `
    try {
        pool.query(queryText)
        console.log("Event Table Created if not exists");
        
    } catch (error) {
        console.log(error);
    }
} 

export default createEventTable