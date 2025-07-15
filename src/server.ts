import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (_, res) => res.send("Event Management API is running..."));
app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
