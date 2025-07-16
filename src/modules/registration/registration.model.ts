import { pool } from '../../config/db';

// Check if event exists and is in the future
export const isEventInFuture = async (eventId: number) => {
  const result = await pool.query(
    `SELECT 1 FROM events WHERE id = $1 AND event_date > NOW()`,
    [eventId]
  );
  return (result?.rowCount ?? 0) > 0;
};

// Check if the user is already registered for the event
export const isUserAlreadyRegistered = async (userId: number, eventId: number) => {
  const result = await pool.query(
    `SELECT 1 FROM registrations WHERE user_id = $1 AND event_id = $2`,
    [userId, eventId]
  );
  return (result?.rowCount ?? 0) > 0;
};

// Get the maximum allowed capacity of the event
export const getEventCapacity = async (eventId: number) => {
  const result = await pool.query(
    `SELECT capacity FROM events WHERE id = $1`,
    [eventId]
  );
  return result.rows[0]?.capacity ?? null; // returns null if not found
};

// Count how many users are already registered for the event
export const getRegistrationCount = async (eventId: number) => {
  const result = await pool.query(
    `SELECT COUNT(*) FROM registrations WHERE event_id = $1`,
    [eventId]
  );
  return Number(result.rows[0].count); // convert count from string to number
};

// Register the user for the event
export const registerUserToEvent = async (userId: number, eventId: number) => {
  await pool.query(
    `INSERT INTO registrations (user_id, event_id) VALUES ($1, $2)`,
    [userId, eventId]
  );
};

// Cancel the user's registration
export const cancelUserRegistration = async (userId: number, eventId: number) => {
  await pool.query(
    `DELETE FROM registrations WHERE user_id = $1 AND event_id = $2`,
    [userId, eventId]
  );
};
