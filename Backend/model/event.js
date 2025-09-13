import {query} from "../config/db.js"

class Event {
  static async create(eventData) {
    const {
      created_by, title, description, duration, 
      start_time, end_time, event_date
    } = eventData;

    const result = await query(
      `INSERT INTO events (created_by, title, description, duration, start_time, end_time, event_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [created_by, title, description, duration, start_time, end_time, event_date]
    );

    return result.rows[0];
  }
  static async update(id, eventData) {
    const {
      title, description, duration, 
      start_time, end_time, event_date
    } = eventData;

    const result = await query(
      `UPDATE events 
       SET title = $1, 
           description = $2, 
           duration = $3, 
           start_time = $4, 
           end_time = $5, 
           event_date = $6
       WHERE id = $7
       RETURNING *`,
      [title, description, duration, start_time, end_time, event_date, id]
    );

    if (result.rows.length === 0) {
      throw new Error('Event not found');
    }

    return result.rows[0];
  }

  static async delete(id) {
    const result = await query(
      'DELETE FROM events WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      throw new Error('Event not found');
    }

    return result.rows[0];
  }

  static async getAll() {
    const result = await query(
      'SELECT * FROM events ORDER BY event_date ASC, start_time ASC'
    );
    return result.rows;
  }
}

export default Event;