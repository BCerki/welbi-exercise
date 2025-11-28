import { Database } from 'bun:sqlite';
import { drizzle } from 'drizzle-orm/bun-sqlite';
import * as schema from './src/schema';

function createDatabase() {
  // Determine database path
  const databasePath = process.env.DATABASE_URL?.replace('sqlite:', '') || './database.sqlite';
  
  console.log(`Setting up SQLite database at: ${databasePath}`);
  
  // Create Bun SQLite database connection
  const sqlite = new Database(databasePath);
  
  // Enable foreign keys
  sqlite.exec('PRAGMA foreign_keys = ON');
  
  const db = drizzle(sqlite, { schema });

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

  // Insert some sample data
  console.log('Inserting sample data...');
  
  const insertUser = sqlite.prepare(`
    INSERT OR IGNORE INTO users (email, name) VALUES (?, ?)
  `);
  
  const insertRole = sqlite.prepare(`
    INSERT OR IGNORE INTO roles (name, description) VALUES (?, ?)
  `);
  
  const insertPermission = sqlite.prepare(`
    INSERT OR IGNORE INTO permissions (name, resource, action) VALUES (?, ?, ?)
  `);

  // Sample users
  insertUser.run('admin@example.com', 'Administrator');
  insertUser.run('user@example.com', 'Regular User');

  // Sample roles
  insertRole.run('admin', 'Administrator role with full access');
  insertRole.run('user', 'Regular user role with limited access');

  // Sample permissions
  insertPermission.run('read_users', 'user', 'read');
  insertPermission.run('write_users', 'user', 'write');
  insertPermission.run('admin_all', '*', '*');

  console.log('Database setup complete!');
  console.log(`Database location: ${databasePath}`);
  
  sqlite.close();
}

// Run if this file is executed directly
if (import.meta.main) {
  createDatabase();
}

export { createDatabase }; 