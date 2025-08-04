<<<<<<< HEAD
const pool = require('../config/db');

class EventModel {
    // Create a new event
    static async addEvent(eventData) {
        try {
            const {
                event_title,
                conference_details,
                date,
                time,
                timezone,
                name,
                email,
                duration
            } = eventData;

            const query = `
        INSERT INTO events (
          event_title, conference_details, date, time, timezone, 
          name, email, duration
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
        RETURNING *
      `;

            const values = [
                event_title || eventData.title,
                conference_details || eventData.description,
                date || eventData.event_date,
                time || eventData.event_time,
                timezone || 'Asia/Kolkata',
                name || eventData.organizer_name,
                email || eventData.organizer_email,
                duration || '60 minutes'
            ];

            console.log('📝 Inserting event with values:', values);

            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error in addEvent:', error);
            throw new Error(`Database error: ${error.message}`);
        }
    }

    // Get all events
    static async getEvents() {
        try {
            const query = `
        SELECT * FROM events 
        ORDER BY date ASC, time ASC
      `;

            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error in getEvents:', error);
            throw new Error(`Database error: ${error.message}`);
        }
    }

    // Get event by ID
    static async getEventById(eventId) {
        try {
            const query = 'SELECT * FROM events WHERE id = $1';
            const result = await pool.query(query, [eventId]);

            if (result.rows.length === 0) {
                throw new Error('Event not found');
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error in getEventById:', error);
            throw new Error(`Database error: ${error.message}`);
        }
    }

    // Update event
    static async updateEvent(eventId, eventData) {
        try {
            const {
                event_title,
                conference_details,
                date,
                time,
                timezone,
                name,
                email,
                duration
            } = eventData;

            const query = `
        UPDATE events 
        SET event_title = $1, conference_details = $2, date = $3, time = $4,
            timezone = $5, name = $6, email = $7, duration = $8
        WHERE id = $9 
        RETURNING *
      `;

            const values = [
                event_title || eventData.title,
                conference_details || eventData.description,
                date || eventData.event_date,
                time || eventData.event_time,
                timezone || 'Asia/Kolkata',
                name || eventData.organizer_name,
                email || eventData.organizer_email,
                duration || '60 minutes',
                eventId
            ];

            const result = await pool.query(query, values);

            if (result.rows.length === 0) {
                throw new Error('Event not found');
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error in updateEvent:', error);
            throw new Error(`Database error: ${error.message}`);
        }
    }

    // Delete event
    static async deleteEvent(eventId) {
        try {
            const query = 'DELETE FROM events WHERE id = $1 RETURNING *';
            const result = await pool.query(query, [eventId]);

            if (result.rows.length === 0) {
                throw new Error('Event not found');
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error in deleteEvent:', error);
            throw new Error(`Database error: ${error.message}`);
        }
    }
}

module.exports = EventModel;
=======
const supabase = require('../config/supabase');

class EventModel {
  // Get all events
  static async getAllEvents() {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error fetching events: ${error.message}`);
    }
  }

  // Get event by ID
  static async getEventById(id) {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error fetching event: ${error.message}`);
    }
  }

  // Create new event
  static async createEvent(eventData) {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([eventData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error creating event: ${error.message}`);
    }
  }

  // Update event
  static async updateEvent(id, eventData) {
    try {
      const { data, error } = await supabase
        .from('events')
        .update(eventData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error updating event: ${error.message}`);
    }
  }

  // Delete event
  static async deleteEvent(id) {
    try {
      const { data, error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error deleting event: ${error.message}`);
    }
  }

  // Get upcoming events
  static async getUpcomingEvents() {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('event_date', today)
        .eq('status', 'scheduled')
        .order('event_date', { ascending: true })
        .order('event_time', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error fetching upcoming events: ${error.message}`);
    }
  }

  // Get events by date range
  static async getEventsByDateRange(startDate, endDate) {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('event_date', startDate)
        .lte('event_date', endDate)
        .order('event_date', { ascending: true })
        .order('event_time', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error fetching events by date range: ${error.message}`);
    }
  }
}

module.exports = EventModel;
>>>>>>> d8e8e5641ab39b58d5494d350af813402f5df8ef
