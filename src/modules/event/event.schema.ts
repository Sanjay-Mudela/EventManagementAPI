import { z } from 'zod';

export const createEventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  eventDate: z.coerce.date().refine((date) => date > new Date(), {
    message: 'Event date must be in the future',
  }),
  location: z.string().min(1, 'Location is required'),
  capacity: z.number().int().min(1).max(1000),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
