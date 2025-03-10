// api/initDb.ts
import pool from './db.ts';

async function initDb() {
  try {
    // Create the enum type
    await pool.query(`
      DO $$ BEGIN
        CREATE TYPE note_type AS ENUM ('Document', 'Tweet', 'Youtube', 'Link');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // Create the notes table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        type note_type NOT NULL,
        link TEXT NOT NULL,
        title TEXT NOT NULL,
        tags TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    await pool.end();
  }
}

initDb();