import { Request, Response } from 'express';
import { createEvent } from '../models/eventModel';
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
