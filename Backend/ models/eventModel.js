
const pool = require('../config/db');

const EventModel = {
    async createEvent(event) {
        const { event_title, name, email, duration, date, time, timezone, conference_details } = event;

        const result = await pool.query(
            `INSERT INTO events (event_title, name, email, duration, date, time, timezone, conference_details)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [event_title, name, email, duration, date, time, timezone, conference_details]
        );
        return result.rows[0];
    },

    async getEvents() {
        const result = await pool.query('SELECT * FROM events ORDER BY created_at DESC');
        return result.rows;
    }
};

module.exports = EventModel;
