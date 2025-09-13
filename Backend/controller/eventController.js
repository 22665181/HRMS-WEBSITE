import Event from "../model/event.js"

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.getAll();
    res.json({
      success: true,
      data: events,
      count: events.length
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch events'
    });
  }
};

// Create new event
const createEvent = async (req, res) => {
  try {
    const {
      created_by,
      title,
      description,
      duration,
      start_time,
      end_time,
      event_date
    } = req.body;

    // Basic validation
    if (!created_by || !title || !duration || !start_time || !end_time || !event_date) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: created_by, title, duration, start_time, end_time, event_date'
      });
    }

    const newEvent = await Event.create({
      created_by,
      title,
      description,
      duration,
      start_time,
      end_time,
      event_date
    });

    res.status(201).json({
      success: true,
      data: newEvent,
      message: 'Event created successfully'
    });

  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create event'
    });
  }
};

// Update event
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      duration,
      start_time,
      end_time,
      event_date
    } = req.body;

    // Basic validation
    if (!title || !duration || !start_time || !end_time || !event_date) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: title, duration, start_time, end_time, event_date'
      });
    }

    const updatedEvent = await Event.update(id, {
      title,
      description,
      duration,
      start_time,
      end_time,
      event_date
    });

    res.json({
      success: true,
      data: updatedEvent,
      message: 'Event updated successfully'
    });

  } catch (error) {
    console.error('Error updating event:', error);
    if (error.message === 'Event not found') {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Failed to update event'
    });
  }
};

// Delete event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.delete(id);

    res.json({
      success: true,
      data: deletedEvent,
      message: 'Event deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting event:', error);
    if (error.message === 'Event not found') {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Failed to delete event'
    });
  }
};

export { getAllEvents, createEvent, updateEvent, deleteEvent }