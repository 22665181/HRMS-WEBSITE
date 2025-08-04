
const express = require('express');
const { createEvent, getAllEvents } = require('../controllers/eventController');
const router = express.Router();

// Event routes
router.post('/', createEvent);     // Create new event
router.get('/', getAllEvents);     // Get all events

module.exports = router;
