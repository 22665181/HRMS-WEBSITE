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