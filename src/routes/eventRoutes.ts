import express from 'express';
import { createEventController, getEventDetailsController, registerUserController } from '../controllers/eventController';

const router = express.Router();

router.post('/events', createEventController);

router.get('/events/:id', getEventDetailsController);

router.post('/events/:id/register', registerUserController);

export default router;
