// index.js
require("dotenv").config(); // Load environment variables from .env file

// Import necessary modules
const express = require("express");
const { Pool } = require("pg");

// Initialize Express app & Cors
const app = express();
const cors = require("cors");

// Middleware
app.use(cors()); 
app.use(express.json());

// Database connection setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, //For Render production environment
});

// Centralized error handling for unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
});

// Basic health check route
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// Routes
// Test route
app.get("/", (req, res) => {
  res.send("Re-entry Day4: Server + DB connected.");
});

// GET all checkins
app.get("/checkins", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM checkins");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error occurred");
  }
});

// POST a new checkin
app.post("/checkins", async (req, res) => {
  const { mood, note } = req.body;

  // Simple input validation
  if (!mood) {
    return res.status(400).send("Mood is required");
  }

  try {
    const result = await pool.query(
      "INSERT INTO checkins (mood, note) VALUES ($1, $2) RETURNING *",
      [mood, note || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error occurred");
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});