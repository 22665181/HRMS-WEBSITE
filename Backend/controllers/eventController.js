const EventModel = require('../models/eventModel');
const { validationResult } = require('express-validator');

class EventController {
  // Get all events
  static async getAllEvents(req, res) {
    try {
      const events = await EventModel.getAllEvents();
      res.status(200).json({
        success: true,
        message: 'Events retrieved successfully',
        data: events
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get event by ID
  static async getEventById(req, res) {
    try {
      const { id } = req.params;
      const event = await EventModel.getEventById(id);
      
      if (!event) {
        return res.status(404).json({
          success: false,
          message: 'Event not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Event retrieved successfully',
        data: event
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Create new event
  static async createEvent(req, res) {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      const eventData = {
        title: req.body.title,
        description: req.body.description,
        organizer_name: req.body.organizer_name,
        organizer_email: req.body.organizer_email,
        event_date: req.body.event_date,
        event_time: req.body.event_time,
        duration: req.body.duration || '30 min',
        timezone: req.body.timezone || 'Asia/Kolkata',
        conference_details: req.body.conference_details || 'Web conferencing details provided upon confirmation.',
        status: req.body.status || 'scheduled'
      };

      const newEvent = await EventModel.createEvent(eventData);
      
      res.status(201).json({
        success: true,
        message: 'Event created successfully',
        data: newEvent
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Update event
  static async updateEvent(req, res) {
    try {
      const { id } = req.params;
      
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      const eventData = {};
      
      // Only include fields that are provided
      if (req.body.title) eventData.title = req.body.title;
      if (req.body.description) eventData.description = req.body.description;
      if (req.body.organizer_name) eventData.organizer_name = req.body.organizer_name;
      if (req.body.organizer_email) eventData.organizer_email = req.body.organizer_email;
      if (req.body.event_date) eventData.event_date = req.body.event_date;
      if (req.body.event_time) eventData.event_time = req.body.event_time;
      if (req.body.duration) eventData.duration = req.body.duration;
      if (req.body.timezone) eventData.timezone = req.body.timezone;
      if (req.body.conference_details) eventData.conference_details = req.body.conference_details;
      if (req.body.status) eventData.status = req.body.status;

      const updatedEvent = await EventModel.updateEvent(id, eventData);
      
      res.status(200).json({
        success: true,
        message: 'Event updated successfully',
        data: updatedEvent
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Delete event
  static async deleteEvent(req, res) {
    try {
      const { id } = req.params;
      const deletedEvent = await EventModel.deleteEvent(id);
      
      res.status(200).json({
        success: true,
        message: 'Event deleted successfully',
        data: deletedEvent
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get upcoming events
  static async getUpcomingEvents(req, res) {
    try {
      const events = await EventModel.getUpcomingEvents();
      res.status(200).json({
        success: true,
        message: 'Upcoming events retrieved successfully',
        data: events
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get events by date range
  static async getEventsByDateRange(req, res) {
    try {
      const { startDate, endDate } = req.query;
      
      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          message: 'Start date and end date are required'
        });
      }

      const events = await EventModel.getEventsByDateRange(startDate, endDate);
      res.status(200).json({
        success: true,
        message: 'Events retrieved successfully',
        data: events
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = EventController;