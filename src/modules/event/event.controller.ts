import { Request, Response } from 'express';
import {
  createEvent,
  getAllUpcomingEvents,
  getEventDetails,
  getEventStats,
} from './event.model';
import { createEventSchema } from './event.schema';

export const createEventController = async (req: Request, res: Response) => {
  const parsed = createEventSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { title, eventDate, location, capacity } = parsed.data;

  try {
    const newEvent = await createEvent(title, eventDate, location, capacity);
    return res.status(201).json({ message: 'Event created', event: newEvent });
  } catch (err) {
    console.error('Create Event Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllUpcomingEventsController = async (_req: Request, res: Response) => {
  try {
    const events = await getAllUpcomingEvents();
    return res.json({ events });
  } catch (err) {
    console.error('Get Upcoming Events Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getEventDetailsController = async (req: Request, res: Response) => {
  const eventId = Number(req.params.id);

  if (isNaN(eventId)) {
    return res.status(400).json({ error: 'Invalid event ID' });
  }

  try {
    const event = await getEventDetails(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    return res.json({ event });
  } catch (err) {
    console.error('Get Event Details Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getEventStatsController = async (req: Request, res: Response) => {
  const eventId = Number(req.params.id);

  if (isNaN(eventId)) {
    return res.status(400).json({ error: 'Invalid event ID' });
  }

  try {
    const stats = await getEventStats(eventId);
    if (!stats) return res.status(404).json({ error: 'Event not found' });

    return res.json({ stats });
  } catch (err) {
    console.error('Get Event Stats Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
