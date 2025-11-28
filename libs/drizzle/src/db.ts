import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import * as schema from './schema';
import { parseDatabaseConfig } from '@testwelbi/env-parser';

// Get database configuration
const dbConfig = parseDatabaseConfig();
// For SQLite, we'll use a file path instead of a URL
const databasePath = process.env.DATABASE_URL?.replace('sqlite:', '') || './database.sqlite';

// Create Bun SQLite database connection
const sqlite = new Database(databasePath);

// Enable foreign keys
sqlite.exec('PRAGMA foreign_keys = ON');

export const db = drizzle(sqlite, { schema });