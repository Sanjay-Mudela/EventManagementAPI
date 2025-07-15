import express from 'express';
import { createEventController, getEventDetailsController } from '../controllers/eventController';

const router = express.Router();

router.post('/events', createEventController);

router.get('/events/:id', getEventDetailsController);

export default router;
