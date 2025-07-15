import express from 'express';
import { createEventController, getEventDetailsController, registerUserController, cancelRegistrationController } from '../controllers/eventController';

const router = express.Router();

router.post('/events', createEventController);

router.get('/events/:id', getEventDetailsController);

router.post('/events/:id/register', registerUserController);

router.delete('/events/:id/register', cancelRegistrationController);

export default router;
