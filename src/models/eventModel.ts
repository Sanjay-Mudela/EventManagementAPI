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


export const registerUser = async (userId: number, eventId: number) => {
  // 1. Check if event exists and is upcoming
  const eventResult = await pool.query(
    `SELECT capacity, event_date FROM events WHERE id = $1`,
    [eventId]
  );

  if (eventResult.rows.length === 0) {
    throw new Error('Event not found');
  }

  const { capacity, event_date } = eventResult.rows[0];

  // 2. Check if event is in the past
  if (new Date(event_date) < new Date()) {
    throw new Error('Cannot register for past event');
  }

  // 3. Check current registration count
  const regCountResult = await pool.query(
    `SELECT COUNT(*) FROM registrations WHERE event_id = $1`,
    [eventId]
  );
  const currentCount = Number(regCountResult.rows[0].count);

  if (currentCount >= capacity) {
    throw new Error('Event is full');
  }

  // 4. Check for duplicate registration
  const exists = await pool.query(
    `SELECT * FROM registrations WHERE user_id = $1 AND event_id = $2`,
    [userId, eventId]
  );

  if (exists.rows.length > 0) {
    throw new Error('User already registered for this event');
  }

  // 5. Register the user
  await pool.query(
    `
    INSERT INTO registrations (user_id, event_id)
    VALUES ($1, $2)
    `,
    [userId, eventId]
  );

  return { message: 'User registered successfully' };
};


export const cancelRegistration = async (userId: number, eventId: number) => {
  // Check if user is registered
  const check = await pool.query(
    `SELECT * FROM registrations WHERE user_id = $1 AND event_id = $2`,
    [userId, eventId]
  );

  if (check.rows.length === 0) {
    throw new Error('User is not registered for this event');
  }

  // Delete the registration
  await pool.query(
    `DELETE FROM registrations WHERE user_id = $1 AND event_id = $2`,
    [userId, eventId]
  );

  return { message: 'Registration cancelled successfully' };
};



export const getEventStats = async (eventId: number) => {
  // 1. Get event details
  const eventResult = await pool.query(
    `SELECT id, title, capacity FROM events WHERE id = $1`,
    [eventId]
  );

  if (eventResult.rows.length === 0) {
    throw new Error('Event not found');
  }

  const event = eventResult.rows[0];

  // 2. Count registrations
  const regResult = await pool.query(
    `SELECT COUNT(*) FROM registrations WHERE event_id = $1`,
    [eventId]
  );

  const registrations = Number(regResult.rows[0].count);
  const seats_left = event.capacity - registrations;
  const usage_percent = Math.floor((registrations / event.capacity) * 100);

  return {
    event_id: event.id,
    title: event.title,
    capacity: event.capacity,
    registrations,
    seats_left,
    usage_percent
  };
};


export const listUpcomingEvents = async () => {
  const result = await pool.query(
    `
    SELECT * FROM events
    WHERE event_date > NOW()
    ORDER BY event_date ASC, location ASC
    `
  );

  return result.rows;
};
