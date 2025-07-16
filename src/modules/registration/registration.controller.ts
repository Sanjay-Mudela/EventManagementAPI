import { Request, Response } from 'express';
import {
  isEventInFuture,
  isUserAlreadyRegistered,
  getEventCapacity,
  getRegistrationCount,
  registerUserToEvent,
  cancelUserRegistration
} from './registration.model';
import { registrationSchema } from './registration.schema';

export const registerUserController = async (req: Request, res: Response) => {
  // Validate input
  const parsed = registrationSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { userId, eventId } = parsed.data;

  try {
    // Business Rule 1: Only allow future events
    const future = await isEventInFuture(eventId);
    if (!future) {
      return res.status(400).json({ error: 'Cannot register for past event' });
    }

    // Business Rule 2: No duplicate registrations
    const alreadyRegistered = await isUserAlreadyRegistered(userId, eventId);
    if (alreadyRegistered) {
      return res.status(409).json({ error: 'User already registered for this event' });
    }

    // Business Rule 3: Respect capacity
    const [capacity, current] = await Promise.all([
      getEventCapacity(eventId),
      getRegistrationCount(eventId)
    ]);

    if (capacity === null) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (current >= capacity) {
      return res.status(400).json({ error: 'Event is full' });
    }

    // ✅ Register the user
    await registerUserToEvent(userId, eventId);
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const cancelRegistrationController = async (req: Request, res: Response) => {
  const parsed = registrationSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { userId, eventId } = parsed.data;

  try {
    const isRegistered = await isUserAlreadyRegistered(userId, eventId);
    if (!isRegistered) {
      return res.status(400).json({ error: 'User is not registered for this event' });
    }

    await cancelUserRegistration(userId, eventId);
    return res.json({ message: 'Registration cancelled successfully' });
  } catch (err) {
    console.error('Cancel error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
