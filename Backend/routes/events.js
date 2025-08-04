const express = require('express');
const { body } = require('express-validator');
const EventController = require('../controllers/eventController');

const router = express.Router();

// Validation middleware for creating events
const createEventValidation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  
  body('organizer_name')
    .notEmpty()
    .withMessage('Organizer name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Organizer name must be between 2 and 50 characters'),
  
  body('organizer_email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  
  body('event_date')
    .isISO8601()
    .withMessage('Valid date is required (YYYY-MM-DD format)')
    .custom((value) => {
      const eventDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (eventDate < today) {
        throw new Error('Event date cannot be in the past');
      }
      return true;
    }),
  
  body('event_time')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Valid time is required (HH:MM format)'),
  
  body('duration')
    .optional()
    .isLength({ max: 20 })
    .withMessage('Duration must be less than 20 characters'),
  
  body('timezone')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Timezone must be less than 50 characters'),
  
  body('status')
    .optional()
    .isIn(['scheduled', 'completed', 'cancelled'])
    .withMessage('Status must be scheduled, completed, or cancelled')
];

// Validation middleware for updating events
const updateEventValidation = [
  body('title')
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  
  body('organizer_name')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('Organizer name must be between 2 and 50 characters'),
  
  body('organizer_email')
    .optional()
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  
  body('event_date')
    .optional()
    .isISO8601()
    .withMessage('Valid date is required (YYYY-MM-DD format)'),
  
  body('event_time')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Valid time is required (HH:MM format)'),
  
  body('status')
    .optional()
    .isIn(['scheduled', 'completed', 'cancelled'])
    .withMessage('Status must be scheduled, completed, or cancelled')
];

// Routes
router.get('/', EventController.getAllEvents);
router.get('/upcoming', EventController.getUpcomingEvents);
router.get('/date-range', EventController.getEventsByDateRange);
router.get('/:id', EventController.getEventById);
router.post('/', createEventValidation, EventController.createEvent);
router.put('/:id', updateEventValidation, EventController.updateEvent);
router.delete('/:id', EventController.deleteEvent);

module.exports = router;