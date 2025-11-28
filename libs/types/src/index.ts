// Base types
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginationInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

export interface Connection<T> {
  edges: Array<{
    node: T;
    cursor: string;
  }>;
  pageInfo: PaginationInfo;
}

// Common utility types
export type Maybe<T> = T | null | undefined;
export type ID = string;
export type DateTime = string; // ISO string

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Configuration types
export interface DatabaseConfig {
  url: string;
  maxConnections?: number;
  debug?: boolean;
}

export interface ServerConfig {
  port: number;
  host?: string;
  cors?: {
    origin: string | string[];
    credentials?: boolean;
  };
}

export interface AuthConfig {
  jwtSecret: string;
  jwtExpiresIn: string;
  refreshTokenExpiresIn: string;
}

// Permission types (to be extended by permissions library)
export interface Permission {
  action: string;
  subject: string;
  conditions?: Record<string, unknown>;
  fields?: string[];
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

// Event-related types
export interface WellnessDimension {
  id: string;
  name: string;
  description?: string;
  color?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Hobby {
  id: string;
  name: string;
  description?: string;
  category?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  color?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LevelOfCare {
  id: string;
  name: string;
  description?: string;
  level: number;
  requirements?: string[];
  isActive: boolean;
  createdAt: Date;
}

export interface Facilitator {
  id: string;
  userId?: string;
  employeeId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department?: string;
  position?: string;
  specialties?: string[];
  isActive: boolean;
  hireDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  id: string;
  name: string;
  description?: string;
  type?: string;
  capacity?: number;
  equipment?: string[];
  accessibility?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventSeries {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecurrencePattern {
  id: string;
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  daysOfWeek?: number[];
  dayOfMonth?: number;
  weekOfMonth?: number;
  monthOfYear?: number;
  endDate?: Date;
  occurrences?: number;
  createdAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  duration?: number;
  allDay: boolean;
  wellnessDimensionId?: string;
  locationId?: string;
  seriesId?: string;
  recurrencePatternId?: string;
  parentEventId?: string;
  maxParticipants?: number;
  currentParticipants: number;
  registrationRequired: boolean;
  registrationDeadline?: Date;
  status: 'scheduled' | 'cancelled' | 'completed';
  notes?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventWithRelations extends Event {
  wellnessDimension?: WellnessDimension;
  location?: Location;
  series?: EventSeries;
  recurrencePattern?: RecurrencePattern;
  hobbies?: Hobby[];
  tags?: Tag[];
  levelsOfCare?: LevelOfCare[];
  facilitators?: EventFacilitatorWithDetails[];
  participants?: EventParticipantWithDetails[];
  parentEvent?: Event;
  childEvents?: Event[];
}

export interface EventFacilitatorWithDetails {
  id: string;
  eventId: string;
  facilitatorId: string;
  role: string;
  createdAt: Date;
  facilitator: Facilitator;
}

export interface EventParticipantWithDetails {
  id: string;
  eventId: string;
  userId: string;
  registeredAt: Date;
  status: 'registered' | 'attended' | 'no_show' | 'cancelled';
  notes?: string;
  user: User;
}

// Event query filters
export interface EventFilters {
  startDate?: Date;
  endDate?: Date;
  wellnessDimensionIds?: string[];
  hobbyIds?: string[];
  tagIds?: string[];
  levelOfCareIds?: string[];
  facilitatorIds?: string[];
  locationIds?: string[];
  seriesIds?: string[];
  status?: ('scheduled' | 'cancelled' | 'completed')[];
  registrationRequired?: boolean;
  hasAvailableSpots?: boolean;
}

export interface EventSortOptions {
  field: 'startTime' | 'title' | 'createdAt' | 'currentParticipants';
  direction: 'asc' | 'desc';
} 