import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').unique().notNull(),
  name: text('name').notNull(),
  createdAt: real('created_at').default(sql`(unixepoch())`),
  updatedAt: real('updated_at').default(sql`(unixepoch())`),
});

export const roles = sqliteTable('roles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').unique().notNull(),
  description: text('description'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: real('created_at').default(sql`(unixepoch())`),
});

export const permissions = sqliteTable('permissions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').unique().notNull(),
  resource: text('resource').notNull(),
  action: text('action').notNull(),
  createdAt: real('created_at').default(sql`(unixepoch())`),
});

// Wellness dimensions
export const wellnessDimensions = sqliteTable('wellness_dimensions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').unique().notNull(),
  description: text('description'),
  color: text('color'), // hex color for UI
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: real('created_at').default(sql`(unixepoch())`),
});

// Hobbies
export const hobbies = sqliteTable('hobbies', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').unique().notNull(),
  description: text('description'),
  category: text('category'), // e.g., 'arts', 'sports', 'social', etc.
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: real('created_at').default(sql`(unixepoch())`),
});

// Tags
export const tags = sqliteTable('tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').unique().notNull(),
  color: text('color'), // hex color for UI
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: real('created_at').default(sql`(unixepoch())`),
  updatedAt: real('updated_at').default(sql`(unixepoch())`),
});

// Levels of care
export const levelsOfCare = sqliteTable('levels_of_care', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').unique().notNull(),
  description: text('description'),
  level: integer('level').notNull(), // numerical level for ordering
  requirements: text('requirements', { mode: 'json' }), // JSON array of requirements
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: real('created_at').default(sql`(unixepoch())`),
});

// Facilitators (employees)
export const facilitators = sqliteTable('facilitators', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id),
  employeeId: text('employee_id').unique(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').unique().notNull(),
  phone: text('phone'),
  department: text('department'),
  position: text('position'),
  specialties: text('specialties', { mode: 'json' }), // JSON array of specialties
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  hireDate: real('hire_date'),
  createdAt: real('created_at').default(sql`(unixepoch())`),
  updatedAt: real('updated_at').default(sql`(unixepoch())`),
});

// Locations
export const locations = sqliteTable('locations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').unique().notNull(),
  description: text('description'),
  type: text('type'), // e.g., 'room', 'outdoor', 'hall', 'gym'
  capacity: integer('capacity'),
  equipment: text('equipment', { mode: 'json' }), // JSON array of available equipment
  accessibility: text('accessibility', { mode: 'json' }), // JSON array of accessibility features
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: real('created_at').default(sql`(unixepoch())`),
  updatedAt: real('updated_at').default(sql`(unixepoch())`),
});

// Event series
export const eventSeries = sqliteTable('event_series', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: real('created_at').default(sql`(unixepoch())`),
  updatedAt: real('updated_at').default(sql`(unixepoch())`),
});

// Recurrence patterns
export const recurrencePatterns = sqliteTable('recurrence_patterns', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  type: text('type').notNull(), // 'daily', 'weekly', 'monthly', 'yearly'
  interval: integer('interval').default(1), // every N days/weeks/months/years
  daysOfWeek: text('days_of_week', { mode: 'json' }), // JSON array for weekly patterns
  dayOfMonth: integer('day_of_month'), // for monthly patterns
  weekOfMonth: integer('week_of_month'), // for monthly patterns (1st, 2nd, etc.)
  monthOfYear: integer('month_of_year'), // for yearly patterns
  endDate: real('end_date'), // when recurrence ends
  occurrences: integer('occurrences'), // max number of occurrences
  createdAt: real('created_at').default(sql`(unixepoch())`),
});

// Main events table
export const events = sqliteTable('events', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description'),
  startTime: real('start_time').notNull(),
  endTime: real('end_time').notNull(),
  duration: integer('duration'), // in minutes, calculated field
  allDay: integer('all_day', { mode: 'boolean' }).default(false),
  
  // Relationships
  wellnessDimensionId: integer('wellness_dimension_id').references(() => wellnessDimensions.id),
  locationId: integer('location_id').references(() => locations.id),
  seriesId: integer('series_id').references(() => eventSeries.id),
  recurrencePatternId: integer('recurrence_pattern_id').references(() => recurrencePatterns.id),
  parentEventId: integer('parent_event_id'), // for recurring events - self-reference
  
  // Metadata
  maxParticipants: integer('max_participants'),
  currentParticipants: integer('current_participants').default(0),
  registrationRequired: integer('registration_required', { mode: 'boolean' }).default(false),
  registrationDeadline: real('registration_deadline'),
  status: text('status').default('scheduled'), // 'scheduled', 'cancelled', 'completed'
  notes: text('notes'),
  
  // Audit fields
  createdBy: integer('created_by').references(() => users.id),
  updatedBy: integer('updated_by').references(() => users.id),
  createdAt: real('created_at').default(sql`(unixepoch())`),
  updatedAt: real('updated_at').default(sql`(unixepoch())`),
});

// Junction tables for many-to-many relationships

// Event-Hobby relationship
export const eventHobbies = sqliteTable('event_hobbies', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  eventId: integer('event_id').references(() => events.id),
  hobbyId: integer('hobby_id').references(() => hobbies.id),
  createdAt: real('created_at').default(sql`(unixepoch())`),
});

// Event-Tag relationship
export const eventTags = sqliteTable('event_tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  eventId: integer('event_id').references(() => events.id),
  tagId: integer('tag_id').references(() => tags.id),
  createdAt: real('created_at').default(sql`(unixepoch())`),
});

// Event-LevelOfCare relationship
export const eventLevelsOfCare = sqliteTable('event_levels_of_care', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  eventId: integer('event_id').references(() => events.id),
  levelOfCareId: integer('level_of_care_id').references(() => levelsOfCare.id),
  createdAt: real('created_at').default(sql`(unixepoch())`),
});

// Event-Facilitator relationship
export const eventFacilitators = sqliteTable('event_facilitators', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  eventId: integer('event_id').references(() => events.id),
  facilitatorId: integer('facilitator_id').references(() => facilitators.id),
  role: text('role').default('facilitator'), // 'facilitator', 'assistant', 'coordinator'
  createdAt: real('created_at').default(sql`(unixepoch())`),
});

// Event participants (residents)
export const eventParticipants = sqliteTable('event_participants', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  eventId: integer('event_id').references(() => events.id),
  userId: integer('user_id').references(() => users.id),
  registeredAt: real('registered_at').default(sql`(unixepoch())`),
  status: text('status').default('registered'), // 'registered', 'attended', 'no_show', 'cancelled'
  notes: text('notes'),
}); 