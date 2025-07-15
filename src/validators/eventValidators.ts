import { z } from 'zod';

export const createEventSchema = z.object({
  title: z.string().min(1),
  event_date: z.string().datetime(),
  location: z.string().min(1),
  capacity: z.number().int().positive().max(1000),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
