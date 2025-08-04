const EventModel = require('../models/eventModel');

exports.createEvent = async (req, res) => {
    try {
        console.log('📝 Creating new event with data:', req.body);

        // Validate required fields (matching your existing table structure)
        const { event_title, name, email, date, time } = req.body;

        if (!event_title || !name || !email || !date || !time) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: event_title, name, email, date, time"
            });
        }

        const newEvent = await EventModel.addEvent(req.body);
        console.log('✅ Event created successfully:', newEvent);

        res.status(201).json({
            success: true,
            message: "Event created successfully",
            data: newEvent
        });
    } catch (error) {
        console.error('❌ Error creating event:', error);
        res.status(500).json({
            success: false,
            message: "Error creating event",
            error: error.message
        });
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        console.log('📋 Fetching all events...');
        const events = await EventModel.getEvents();
        console.log(`✅ Found ${events.length} events`);

        res.status(200).json({
            success: true,
            message: "Events fetched successfully",
            data: events
        });
    } catch (error) {
        console.error('❌ Error fetching events:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching events",
            error: error.message
        });
    }
};
