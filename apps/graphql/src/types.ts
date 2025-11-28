import type { AppAbility } from '@testwelbi/permissions';
import type { db } from '@testwelbi/drizzle';
import * as dbSchema from '@testwelbi/drizzle';

// Drizzle inferred types
export type User = typeof dbSchema.users.$inferSelect;
export type Role = typeof dbSchema.roles.$inferSelect;

// Context type
export interface Context {
  user?: User;
  roles: Role[];
  ability: AppAbility;
  db: typeof db;
} 