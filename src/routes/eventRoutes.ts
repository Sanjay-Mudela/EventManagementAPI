import express from 'express';
import { createEventController, getEventDetailsController, registerUserController, cancelRegistrationController, getEventStatsController } from '../controllers/eventController';

const router = express.Router();

router.post('/events', createEventController);

router.get('/events/:id', getEventDetailsController);

router.post('/events/:id/register', registerUserController);

router.delete('/events/:id/register', cancelRegistrationController);

router.get('/events/:id/stats', getEventStatsController);

export default router;
