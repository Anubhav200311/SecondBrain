// src/api/server.ts
import express, { Request, Response } from 'express';
import pool from 'api/db';
import bcrypt from 'bcrypt';


const app: express.Application = express();
const port: number = 3001;

app.use(express.json());

// Create a new note

app.get('/' , (req , res) => {
  res.json("Hello this is the backend")
})
app.post('/api/notes', async (req: Request, res: Response) => {
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

app.post("/api/signup", async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Username and password are required" });
    return;
  }

  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

    if (rows.length > 0) {
      res.status(409).json({ message: "Username already exists" });
      return;
    }

    const saltRounds = parseInt(process.env.SALT || "10");
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const insertResult = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, hashedPassword]
    );

    const newUser = insertResult.rows[0];
    delete newUser.password; // Remove password from the response
    res.status(201).json(newUser);
    return;
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});