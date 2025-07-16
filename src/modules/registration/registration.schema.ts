import { z } from 'zod';

export const registrationSchema = z.object({
  userId: z.number().int().positive(),
  eventId: z.number().int().positive(),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
