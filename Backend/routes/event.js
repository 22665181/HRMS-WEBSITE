import express from 'express';
import { getAllEvents, createEvent, updateEvent, deleteEvent } from '../controller/eventController.js';

const router = express.Router();

// GET /api/events - Get all events
router.get('/', getAllEvents);

// POST /api/events - Create new event
router.post('/', createEvent);

// PUT /api/events - update events
router.put('/:id', updateEvent)

// DELETE /api/events - delete events
router.delete('/:id', deleteEvent);


export default router;