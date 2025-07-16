import { pool } from '../../config/db';

// Create a new event
export const createEvent = async (
  title: string,
  eventDate: Date,
  location: string,
  capacity: number
) => {
  const result = await pool.query(
    `INSERT INTO events (title, event_date, location, capacity)
     VALUES ($1, $2, $3, $4)
     RETURNING id, title, event_date AS "eventDate", location, capacity`,
    [title, eventDate, location, capacity]
  );
  return result.rows[0];
};

// Get all upcoming events sorted by date (asc), then location (asc)
export const getAllUpcomingEvents = async () => {
  const result = await pool.query(
    `SELECT id, title, event_date AS "eventDate", location, capacity
     FROM events
     WHERE event_date > NOW()
     ORDER BY event_date ASC, location ASC`
  );
  return result.rows;
};

// Get event details with a list of registered user IDs
export const getEventDetails = async (eventId: number) => {
  const eventResult = await pool.query(
    `SELECT id, title, event_date AS "eventDate", location, capacity
     FROM events
     WHERE id = $1`,
    [eventId]
  );

  if (eventResult.rowCount === 0) return null;

  const registrationsResult = await pool.query(
    `SELECT user_id FROM registrations WHERE event_id = $1`,
    [eventId]
  );

  return {
    ...eventResult.rows[0],
    registeredUsers: registrationsResult.rows.map((r) => r.user_id),
  };
};

// Get event statistics (total, left, and usage %)
export const getEventStats = async (eventId: number) => {
  const capacityResult = await pool.query(
    `SELECT capacity FROM events WHERE id = $1`,
    [eventId]
  );
  if (capacityResult.rowCount === 0) return null;

  const registrationCountResult = await pool.query(
    `SELECT COUNT(*) FROM registrations WHERE event_id = $1`,
    [eventId]
  );

  const capacity = capacityResult.rows[0].capacity;
  const registered = Number(registrationCountResult.rows[0].count);
  const remaining = capacity - registered;
  const percent = Math.round((registered / capacity) * 100);

  return {
    totalRegistrations: registered,
    seatsLeft: remaining,
    usagePercent: percent,
  };
};
