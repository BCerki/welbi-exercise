import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import * as schema from './schema';

async function runMigration() {
  const databasePath = process.env.DATABASE_URL?.replace('sqlite:', '') || './database.sqlite';
  
  console.log(`Setting up SQLite database at: ${databasePath}`);
  
  // Create Bun SQLite database connection
  const sqlite = new Database(databasePath);
  sqlite.exec('PRAGMA foreign_keys = ON');
  const db = drizzle(sqlite, { schema });

  // Create tables manually since we don't have migration files yet
  console.log('Creating tables...');
  
  // Create users table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      created_at REAL DEFAULT (unixepoch()),
      updated_at REAL DEFAULT (unixepoch())
    );
  `);

  // Create roles table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS roles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      description TEXT,
      is_active INTEGER DEFAULT 1,
      created_at REAL DEFAULT (unixepoch())
    );
  `);

  // Create permissions table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS permissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      resource TEXT NOT NULL,
      action TEXT NOT NULL,
      created_at REAL DEFAULT (unixepoch())
    );
  `);

  // Create wellness_dimensions table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS wellness_dimensions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      description TEXT,
      color TEXT,
      is_active INTEGER DEFAULT 1,
      created_at REAL DEFAULT (unixepoch())
    );
  `);

  // Create hobbies table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS hobbies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      description TEXT,
      category TEXT,
      is_active INTEGER DEFAULT 1,
      created_at REAL DEFAULT (unixepoch())
    );
  `);

  // Create tags table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      color TEXT,
      is_active INTEGER DEFAULT 1,
      created_at REAL DEFAULT (unixepoch()),
      updated_at REAL DEFAULT (unixepoch())
    );
  `);

  // Create levels_of_care table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS levels_of_care (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      description TEXT,
      level INTEGER NOT NULL,
      requirements TEXT,
      is_active INTEGER DEFAULT 1,
      created_at REAL DEFAULT (unixepoch())
    );
  `);

  // Create facilitators table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS facilitators (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER REFERENCES users(id),
      employee_id TEXT UNIQUE,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      department TEXT,
      position TEXT,
      specialties TEXT,
      is_active INTEGER DEFAULT 1,
      hire_date REAL,
      created_at REAL DEFAULT (unixepoch()),
      updated_at REAL DEFAULT (unixepoch())
    );
  `);

  // Create locations table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      description TEXT,
      type TEXT,
      capacity INTEGER,
      equipment TEXT,
      accessibility TEXT,
      is_active INTEGER DEFAULT 1,
      created_at REAL DEFAULT (unixepoch()),
      updated_at REAL DEFAULT (unixepoch())
    );
  `);

  // Create event_series table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS event_series (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      is_active INTEGER DEFAULT 1,
      created_at REAL DEFAULT (unixepoch()),
      updated_at REAL DEFAULT (unixepoch())
    );
  `);

  // Create recurrence_patterns table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS recurrence_patterns (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      interval INTEGER DEFAULT 1,
      days_of_week TEXT,
      day_of_month INTEGER,
      week_of_month INTEGER,
      month_of_year INTEGER,
      end_date REAL,
      occurrences INTEGER,
      created_at REAL DEFAULT (unixepoch())
    );
  `);

  // Create events table
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      start_time REAL NOT NULL,
      end_time REAL NOT NULL,
      duration INTEGER,
      all_day INTEGER DEFAULT 0,
      wellness_dimension_id INTEGER REFERENCES wellness_dimensions(id),
      location_id INTEGER REFERENCES locations(id),
      series_id INTEGER REFERENCES event_series(id),
      recurrence_pattern_id INTEGER REFERENCES recurrence_patterns(id),
      parent_event_id INTEGER,
      max_participants INTEGER,
      current_participants INTEGER DEFAULT 0,
      registration_required INTEGER DEFAULT 0,
      registration_deadline REAL,
      status TEXT DEFAULT 'scheduled',
      notes TEXT,
      created_by INTEGER REFERENCES users(id),
      updated_by INTEGER REFERENCES users(id),
      created_at REAL DEFAULT (unixepoch()),
      updated_at REAL DEFAULT (unixepoch())
    );
  `);

  // Create junction tables
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS event_hobbies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER REFERENCES events(id),
      hobby_id INTEGER REFERENCES hobbies(id),
      created_at REAL DEFAULT (unixepoch())
    );
  `);

  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS event_tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER REFERENCES events(id),
      tag_id INTEGER REFERENCES tags(id),
      created_at REAL DEFAULT (unixepoch())
    );
  `);

  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS event_levels_of_care (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER REFERENCES events(id),
      level_of_care_id INTEGER REFERENCES levels_of_care(id),
      created_at REAL DEFAULT (unixepoch())
    );
  `);

  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS event_facilitators (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER REFERENCES events(id),
      facilitator_id INTEGER REFERENCES facilitators(id),
      role TEXT DEFAULT 'facilitator',
      created_at REAL DEFAULT (unixepoch())
    );
  `);

  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS event_participants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER REFERENCES events(id),
      user_id INTEGER REFERENCES users(id),
      registered_at REAL DEFAULT (unixepoch()),
      status TEXT DEFAULT 'registered',
      notes TEXT
    );
  `);

  console.log('Database setup complete!');
  sqlite.close();
}

// Run migration if this file is executed directly
if (require.main === module) {
  runMigration().catch(console.error);
}

export { runMigration }; 