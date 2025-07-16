import { pool } from '../../config/db';

// Insert a new user into the users table
export const createUser = async (name: string, email: string) => {
  const result = await pool.query(
    `INSERT INTO users (name, email)
     VALUES ($1, $2)
     RETURNING id, name, email`,
    [name, email]
  );

  return result.rows[0]; // return the newly created user
};

// Get all users from the database
export const getAllUsers = async () => {
  const result = await pool.query(
    `SELECT id, name, email FROM users ORDER BY id ASC`
  );

  return result.rows; // returns an array of users
};
