import express from 'express';
import {
  createEventController,
  getAllUpcomingEventsController,
  getEventDetailsController,
  getEventStatsController,
} from './event.controller';

const router = express.Router();

// Create a new event
router.post('/create', createEventController);

// List all upcoming events
router.get('/upcoming', getAllUpcomingEventsController);

// Get event details with registered user IDs
router.get('/:id', getEventDetailsController);

// Get event statistics
router.get('/:id/stats', getEventStatsController);

export default router;
