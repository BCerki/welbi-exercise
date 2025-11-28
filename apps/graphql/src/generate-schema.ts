import { createSchemaSDL } from './schema/index';
import fs from 'fs';

// Set DATABASE_URL if not already set (required for Drizzle initialization)
process.env.DATABASE_URL = process.env.DATABASE_URL || 'sqlite:../../database.sqlite';

const sdl = createSchemaSDL();
fs.writeFileSync('schema.graphql', sdl);
console.log('✅ Schema generated successfully!');
