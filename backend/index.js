const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

//Create Postgres connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "FireLordKaen777",
  port: 5432,
});

// Test route
app.get("/", (req, res) => {
  res.send("Re-entry Day4: Server + DB connected.");
});

// Fetch data from Postgres
app.get("/checkins", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM checkins ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error occurred");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});