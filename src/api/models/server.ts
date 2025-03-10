// src/api/server.ts
import express from 'express';
import pool from 'api/db';

const app: express.Application = express();
const port: number = 3001;

app.use(express.json());

// Create a new note

app.get('/' , (req , res) => {
  res.json("Hello this is the backend")
})
app.post('/api/notes', async (req, res) => {
  const { type, link, title, tags } = req.body;

  try {
    const { rows } = await pool.query(
      'INSERT INTO notes (type, link, title, tags) VALUES ($1, $2, $3, $4) RETURNING *',
      [type, link, title, tags]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch all notes
app.get('/api/notes', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM notes');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});