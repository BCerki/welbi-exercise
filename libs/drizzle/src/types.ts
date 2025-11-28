import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { 
  users, 
  roles, 
  permissions, 
  wellnessDimensions,
  hobbies,
  tags,
  levelsOfCare,
  facilitators,
  locations,
  eventSeries,
  recurrencePatterns,
  events,
  eventHobbies,
  eventTags,
  eventLevelsOfCare,
  eventFacilitators,
  eventParticipants
} from './schema';

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export type Role = InferSelectModel<typeof roles>;
export type NewRole = InferInsertModel<typeof roles>;

export type Permission = InferSelectModel<typeof permissions>;
export type NewPermission = InferInsertModel<typeof permissions>;

export type WellnessDimension = InferSelectModel<typeof wellnessDimensions>;
export type NewWellnessDimension = InferInsertModel<typeof wellnessDimensions>;

export type Hobby = InferSelectModel<typeof hobbies>;
export type NewHobby = InferInsertModel<typeof hobbies>;

export type Tag = InferSelectModel<typeof tags>;
export type NewTag = InferInsertModel<typeof tags>;

export type LevelOfCare = InferSelectModel<typeof levelsOfCare>;
export type NewLevelOfCare = InferInsertModel<typeof levelsOfCare>;

export type Facilitator = InferSelectModel<typeof facilitators>;
export type NewFacilitator = InferInsertModel<typeof facilitators>;

export type Location = InferSelectModel<typeof locations>;
export type NewLocation = InferInsertModel<typeof locations>;

export type EventSeries = InferSelectModel<typeof eventSeries>;
export type NewEventSeries = InferInsertModel<typeof eventSeries>;

export type RecurrencePattern = InferSelectModel<typeof recurrencePatterns>;
export type NewRecurrencePattern = InferInsertModel<typeof recurrencePatterns>;

export type Event = InferSelectModel<typeof events>;
export type NewEvent = InferInsertModel<typeof events>;

export type EventHobby = InferSelectModel<typeof eventHobbies>;
export type NewEventHobby = InferInsertModel<typeof eventHobbies>;

export type EventTag = InferSelectModel<typeof eventTags>;
export type NewEventTag = InferInsertModel<typeof eventTags>;

export type EventLevelOfCare = InferSelectModel<typeof eventLevelsOfCare>;
export type NewEventLevelOfCare = InferInsertModel<typeof eventLevelsOfCare>;

export type EventFacilitator = InferSelectModel<typeof eventFacilitators>;
export type NewEventFacilitator = InferInsertModel<typeof eventFacilitators>;

export type EventParticipant = InferSelectModel<typeof eventParticipants>;
export type NewEventParticipant = InferInsertModel<typeof eventParticipants>;

export interface EventWithRelations extends Event {
  wellnessDimension?: WellnessDimension;
  location?: Location;
  series?: EventSeries;
  recurrencePattern?: RecurrencePattern;
  hobbies?: Hobby[];
  tags?: Tag[];
  levelsOfCare?: LevelOfCare[];
  facilitators?: (EventFacilitator & { facilitator: Facilitator })[];
  participants?: (EventParticipant & { user: User })[];
  parentEvent?: Event;
  childEvents?: Event[];
} 