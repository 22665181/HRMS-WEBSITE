
const EventModel = require('../models/eventModel');

exports.createEvent = async (req, res) => {
    try {
        const event = await EventModel.createEvent(req.body);
        res.status(201).json({ message: '✅ Event created successfully', event });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create event' });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await EventModel.getEvents();
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
};
