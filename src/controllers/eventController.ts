import { Request, Response } from 'express';
import { createEvent, fetchEventDetails, registerUser, cancelRegistration, getEventStats } from '../models/eventModel';
import { createEventSchema } from '../validators/eventValidators';


export const createEventController = async (req: Request, res: Response) => {
  try {
    const parsed = createEventSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.format() });
    }

    const eventId = await createEvent(parsed.data);
    return res.status(201).json({ eventId });
  } catch (err) {
    console.error('Error creating event:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getEventDetailsController = async (req: Request, res: Response) => {
  try {
    const eventId = Number(req.params.id);

    if (isNaN(eventId)) {
      return res.status(400).json({ error: 'Invalid event ID' });
    }

    const event = await fetchEventDetails(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    return res.json(event);
  } catch (err) {
    console.error('Error fetching event details:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const registerUserController = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.body.userId); // We'll pass it in body
    const eventId = Number(req.params.id);

    if (isNaN(userId) || isNaN(eventId)) {
      return res.status(400).json({ error: 'Invalid user ID or event ID' });
    }

    const result = await registerUser(userId, eventId);
    return res.status(201).json(result);
  } catch (err: any) {
    const message = err.message || 'Error';
    if (
      message === 'Event not found' ||
      message === 'Cannot register for past event' ||
      message === 'Event is full' ||
      message === 'User already registered for this event'
    ) {
      return res.status(400).json({ error: message });
    }
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const cancelRegistrationController = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.body.userId); // we'll use body again
    const eventId = Number(req.params.id);

    if (isNaN(userId) || isNaN(eventId)) {
      return res.status(400).json({ error: 'Invalid user or event ID' });
    }

    const result = await cancelRegistration(userId, eventId);
    return res.json(result);
  } catch (err: any) {
    const message = err.message || 'Error';
    if (message === 'User is not registered for this event') {
      return res.status(400).json({ error: message });
    }
    console.error('Cancel error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const getEventStatsController = async (req: Request, res: Response) => {
  try {
    const eventId = Number(req.params.id);
    if (isNaN(eventId)) {
      return res.status(400).json({ error: 'Invalid event ID' });
    }

    const stats = await getEventStats(eventId);
    return res.json(stats);
  } catch (err: any) {
    const message = err.message || 'Error';
    if (message === 'Event not found') {
      return res.status(404).json({ error: message });
    }
    console.error('Stats error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
