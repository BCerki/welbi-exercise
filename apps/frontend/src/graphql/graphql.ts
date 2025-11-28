/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Event = {
  __typename?: 'Event';
  allDay?: Maybe<Scalars['Boolean']['output']>;
  availableSpots?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currentParticipants?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  endTime?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  maxParticipants?: Maybe<Scalars['Int']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  registrationDeadline?: Maybe<Scalars['DateTime']['output']>;
  registrationRequired?: Maybe<Scalars['Boolean']['output']>;
  startTime?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type EventFiltersInput = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  facilitatorIds?: InputMaybe<Array<Scalars['String']['input']>>;
  hasAvailableSpots?: InputMaybe<Scalars['Boolean']['input']>;
  hobbyIds?: InputMaybe<Array<Scalars['String']['input']>>;
  levelOfCareIds?: InputMaybe<Array<Scalars['String']['input']>>;
  locationIds?: InputMaybe<Array<Scalars['String']['input']>>;
  registrationRequired?: InputMaybe<Scalars['Boolean']['input']>;
  seriesIds?: InputMaybe<Array<Scalars['String']['input']>>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<Array<EventStatus>>;
  tagIds?: InputMaybe<Array<Scalars['String']['input']>>;
  wellnessDimensionIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type EventSeries = {
  __typename?: 'EventSeries';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum EventSortField {
  CreatedAt = 'createdAt',
  CurrentParticipants = 'currentParticipants',
  StartTime = 'startTime',
  Title = 'title'
}

export type EventSortInput = {
  direction: SortDirection;
  field: EventSortField;
};

export enum EventStatus {
  Cancelled = 'cancelled',
  Completed = 'completed',
  Scheduled = 'scheduled'
}

export type Facilitator = {
  __typename?: 'Facilitator';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  employeeId?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  hireDate?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  specialties?: Maybe<Array<Scalars['String']['output']>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type HealthCheck = {
  __typename?: 'HealthCheck';
  currentUser?: Maybe<User>;
  status?: Maybe<Scalars['String']['output']>;
};

export type Hobby = {
  __typename?: 'Hobby';
  category?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type LevelOfCare = {
  __typename?: 'LevelOfCare';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  level?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  requirements?: Maybe<Array<Scalars['String']['output']>>;
};

export type Location = {
  __typename?: 'Location';
  accessibility?: Maybe<Array<Scalars['String']['output']>>;
  capacity?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  equipment?: Maybe<Array<Scalars['String']['output']>>;
  id?: Maybe<Scalars['ID']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  ping?: Maybe<Scalars['String']['output']>;
};

export enum ParticipantStatus {
  Attended = 'attended',
  Cancelled = 'cancelled',
  NoShow = 'no_show',
  Registered = 'registered'
}

export type Query = {
  __typename?: 'Query';
  event?: Maybe<Event>;
  eventSeries?: Maybe<Array<EventSeries>>;
  events?: Maybe<Array<Event>>;
  facilitators?: Maybe<Array<Facilitator>>;
  health?: Maybe<HealthCheck>;
  hobbies?: Maybe<Array<Hobby>>;
  levelsOfCare?: Maybe<Array<LevelOfCare>>;
  locations?: Maybe<Array<Location>>;
  tags?: Maybe<Array<Tag>>;
  timestamp?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['String']['output']>;
  wellnessDimensions?: Maybe<Array<WellnessDimension>>;
};


export type QueryEventArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEventSeriesArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFacilitatorsArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
};


export type QueryHobbiesArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
};


export type QueryLevelsOfCareArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryLocationsArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTagsArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryWellnessDimensionsArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RecurrencePattern = {
  __typename?: 'RecurrencePattern';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dayOfMonth?: Maybe<Scalars['Int']['output']>;
  daysOfWeek?: Maybe<Array<Scalars['Int']['output']>>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  interval?: Maybe<Scalars['Int']['output']>;
  monthOfYear?: Maybe<Scalars['Int']['output']>;
  occurrences?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  weekOfMonth?: Maybe<Scalars['Int']['output']>;
};

export enum RecurrenceType {
  Daily = 'daily',
  Monthly = 'monthly',
  Weekly = 'weekly',
  Yearly = 'yearly'
}

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Tag = {
  __typename?: 'Tag';
  color?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type WellnessDimension = {
  __typename?: 'WellnessDimension';
  color?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type EventDetailQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EventDetailQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id?: string | null, title?: string | null, description?: string | null, startTime?: any | null, endTime?: any | null, duration?: number | null, allDay?: boolean | null, maxParticipants?: number | null, currentParticipants?: number | null, availableSpots?: number | null, registrationRequired?: boolean | null, registrationDeadline?: any | null, status?: string | null, notes?: string | null, createdAt?: any | null, updatedAt?: any | null } | null };

export type HealthQueryVariables = Exact<{ [key: string]: never; }>;


export type HealthQuery = { __typename?: 'Query', health?: { __typename?: 'HealthCheck', status?: string | null, currentUser?: { __typename?: 'User', id?: string | null, name?: string | null, email?: string | null } | null } | null };

export type EventsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type EventsQuery = { __typename?: 'Query', events?: Array<{ __typename?: 'Event', id?: string | null, title?: string | null, description?: string | null, startTime?: any | null, endTime?: any | null, currentParticipants?: number | null, maxParticipants?: number | null, registrationRequired?: boolean | null, status?: string | null }> | null };

export type CalendarEventsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CalendarEventsQuery = { __typename?: 'Query', events?: Array<{ __typename?: 'Event', id?: string | null, title?: string | null, startTime?: any | null, endTime?: any | null, status?: string | null, description?: string | null, currentParticipants?: number | null, maxParticipants?: number | null }> | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const EventDetailDocument = new TypedDocumentString(`
    query EventDetail($id: ID!) {
  event(id: $id) {
    id
    title
    description
    startTime
    endTime
    duration
    allDay
    maxParticipants
    currentParticipants
    availableSpots
    registrationRequired
    registrationDeadline
    status
    notes
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<EventDetailQuery, EventDetailQueryVariables>;
export const HealthDocument = new TypedDocumentString(`
    query Health {
  health {
    status
    currentUser {
      id
      name
      email
    }
  }
}
    `) as unknown as TypedDocumentString<HealthQuery, HealthQueryVariables>;
export const EventsDocument = new TypedDocumentString(`
    query Events($limit: Int) {
  events(limit: $limit) {
    id
    title
    description
    startTime
    endTime
    currentParticipants
    maxParticipants
    registrationRequired
    status
  }
}
    `) as unknown as TypedDocumentString<EventsQuery, EventsQueryVariables>;
export const CalendarEventsDocument = new TypedDocumentString(`
    query CalendarEvents($limit: Int) {
  events(limit: $limit) {
    id
    title
    startTime
    endTime
    status
    description
    currentParticipants
    maxParticipants
  }
}
    `) as unknown as TypedDocumentString<CalendarEventsQuery, CalendarEventsQueryVariables>;