import express from "express";
import dotenv from "dotenv";
import { pool } from './config/db';
import eventRoutes from './routes/eventRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

if (!PORT) throw new Error("Environment variable PORT is not defined. Please set it before starting the server.");

app.use(express.json());
app.use('/api', eventRoutes);

app.get('/', async (_req, res) => {
  try {
    const result = await pool.query('SELECT NOW()'); 
    res.send(`Event Management API is running. DB time: ${result.rows[0].now}`);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database connection failed');
  }
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
