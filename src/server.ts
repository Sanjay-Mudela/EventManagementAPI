import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

if (!PORT) throw new Error("Environment variable PORT is not defined. Please set it before starting the server.");

app.use(express.json());

app.get("/", (_req, res) => res.send("Event Management API is running..."));
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
