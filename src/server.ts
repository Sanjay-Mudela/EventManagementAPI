// import express from "express";
// import dotenv from "dotenv";
// import { pool } from './config/db';
// import eventRoutes from './routes/eventRoutes';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT;

// if (!PORT) throw new Error("Environment variable PORT is not defined. Please set it before starting the server.");

// app.use(express.json());
// app.use('/api', eventRoutes);

// app.get('/', async (_req, res) => {
//   try {
//     const result = await pool.query('SELECT NOW()'); 
//     res.send(`Event Management API is running. DB time: ${result.rows[0].now}`);
//   } catch (err) {
//     console.error('Database error:', err);
//     res.status(500).send('Database connection failed');
//   }
// });

// app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));




import express from "express";
import dotenv from "dotenv";
import { pool } from './config/db';

import userRoutes from './modules/user/user.routes';
import eventRoutes from './modules/event/event.routes';
import registrationRoutes from './modules/registration/registration.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

if (!PORT) {
  throw new Error("Environment variable PORT is not defined. Please set it before starting the server.");
}

app.use(express.json()); 

// Mount domain-specific routes
app.use('/api/users', userRoutes);               
app.use('/api/events', eventRoutes);             
app.use('/api/registrations', registrationRoutes); 

// Root health check
app.get('/', async (_req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Event Management API is running.\n📆 DB time: ${result.rows[0].now}`);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database connection failed');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
