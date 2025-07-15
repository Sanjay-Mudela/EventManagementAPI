import { pool } from '../config/db';

interface CreateEventInput {
  title: string;
  event_date: string;  // ISO format
  location: string;
  capacity: number;
}

export const createEvent = async (event: CreateEventInput): Promise<number> => {
  const { title, event_date, location, capacity } = event;

  const result = await pool.query(
    `
    INSERT INTO events (title, event_date, location, capacity)
    VALUES ($1, $2, $3, $4)
    RETURNING id
    `,
    [title, event_date, location, capacity]
  );

  return result.rows[0].id;
};
