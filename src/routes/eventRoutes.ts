import express from 'express';
import { createEventController } from '../controllers/eventController';

const router = express.Router();

router.post('/events', createEventController);

export default router;
