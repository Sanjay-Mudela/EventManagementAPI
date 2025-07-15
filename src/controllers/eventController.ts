import { Request, Response } from 'express';
import { createEvent, fetchEventDetails } from '../models/eventModel';
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

