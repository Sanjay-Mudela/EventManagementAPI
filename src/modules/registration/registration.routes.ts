import express from 'express';
import {
  registerUserController,
  cancelRegistrationController,
} from './registration.controller';

const router = express.Router();

// Route to register a user to an event
router.post('/register', registerUserController);

// Route to cancel a user's registration
router.delete('/cancel', cancelRegistrationController);

export default router;
