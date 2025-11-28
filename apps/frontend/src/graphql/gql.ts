/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query EventDetail($id: ID!) {\n    event(id: $id) {\n      id\n      title\n      description\n      startTime\n      endTime\n      duration\n      allDay\n      maxParticipants\n      currentParticipants\n      availableSpots\n      registrationRequired\n      registrationDeadline\n      status\n      notes\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.EventDetailDocument,
    "\n  query Health {\n    health {\n      status\n      currentUser {\n        id\n        name\n        email\n      }\n    }\n  }\n": typeof types.HealthDocument,
    "\n  query Events($limit: Int) {\n    events(limit: $limit) {\n      id\n      title\n      description\n      startTime\n      endTime\n      currentParticipants\n      maxParticipants\n      registrationRequired\n      status\n    }\n  }\n": typeof types.EventsDocument,
    "\n  query CalendarEvents($limit: Int) {\n    events(limit: $limit) {\n      id\n      title\n      startTime\n      endTime\n      status\n      description\n      currentParticipants\n      maxParticipants\n    }\n  }\n": typeof types.CalendarEventsDocument,
};
const documents: Documents = {
    "\n  query EventDetail($id: ID!) {\n    event(id: $id) {\n      id\n      title\n      description\n      startTime\n      endTime\n      duration\n      allDay\n      maxParticipants\n      currentParticipants\n      availableSpots\n      registrationRequired\n      registrationDeadline\n      status\n      notes\n      createdAt\n      updatedAt\n    }\n  }\n": types.EventDetailDocument,
    "\n  query Health {\n    health {\n      status\n      currentUser {\n        id\n        name\n        email\n      }\n    }\n  }\n": types.HealthDocument,
    "\n  query Events($limit: Int) {\n    events(limit: $limit) {\n      id\n      title\n      description\n      startTime\n      endTime\n      currentParticipants\n      maxParticipants\n      registrationRequired\n      status\n    }\n  }\n": types.EventsDocument,
    "\n  query CalendarEvents($limit: Int) {\n    events(limit: $limit) {\n      id\n      title\n      startTime\n      endTime\n      status\n      description\n      currentParticipants\n      maxParticipants\n    }\n  }\n": types.CalendarEventsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query EventDetail($id: ID!) {\n    event(id: $id) {\n      id\n      title\n      description\n      startTime\n      endTime\n      duration\n      allDay\n      maxParticipants\n      currentParticipants\n      availableSpots\n      registrationRequired\n      registrationDeadline\n      status\n      notes\n      createdAt\n      updatedAt\n    }\n  }\n"): typeof import('./graphql').EventDetailDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Health {\n    health {\n      status\n      currentUser {\n        id\n        name\n        email\n      }\n    }\n  }\n"): typeof import('./graphql').HealthDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Events($limit: Int) {\n    events(limit: $limit) {\n      id\n      title\n      description\n      startTime\n      endTime\n      currentParticipants\n      maxParticipants\n      registrationRequired\n      status\n    }\n  }\n"): typeof import('./graphql').EventsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CalendarEvents($limit: Int) {\n    events(limit: $limit) {\n      id\n      title\n      startTime\n      endTime\n      status\n      description\n      currentParticipants\n      maxParticipants\n    }\n  }\n"): typeof import('./graphql').CalendarEventsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
