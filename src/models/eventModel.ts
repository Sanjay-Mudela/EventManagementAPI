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


export const fetchEventDetails = async (eventId: number) => {
  // Get event info
  const eventResult = await pool.query(
    `SELECT * FROM events WHERE id = $1`,
    [eventId]
  );

  if (eventResult.rows.length === 0) {
    return null; // Event not found
  }

  const event = eventResult.rows[0];

  // Get registered users
  const registrationsResult = await pool.query(
    `
    SELECT users.id, users.name, users.email
    FROM users
    JOIN registrations ON users.id = registrations.user_id
    WHERE registrations.event_id = $1
    `,
    [eventId]
  );

  return {
    ...event,
    registrations: registrationsResult.rows,
  };
};
