# Challenge 1: Event Registration System

**Difficulty**: Medium | **Estimated Time**: 2-3 hours | **Focus**: Full-Stack Feature Development

## Context

You're working on a wellness event management platform. The current system allows users to view events, but there's no way for residents to register for events they're interested in. Your task is to implement a complete event registration system.

## Current State

- Events are displayed on the homepage and detail pages
- The database schema already includes an `eventParticipants` table for tracking registrations
- Basic GraphQL queries exist for fetching events
- The permission system using CASL is already implemented
- Event capacity tracking fields (`maxParticipants`, `currentParticipants`) exist
- Development authentication is available via `x-dev-user-id` header (full auth is Challenge 7)
- Sample users exist in the database (IDs 1-20 from seed data)

## Your Task

Implement a complete event registration system that allows users to:
1. Register for events they're interested in
2. Cancel their registration if plans change
3. See their registration status on event pages
4. View available spots for each event

## Requirements

### Backend (GraphQL) Requirements

1. **Add Registration Mutations**
   - `registerForEvent(eventId: ID!): EventRegistrationResult!`
   - `cancelEventRegistration(eventId: ID!): EventRegistrationResult!`

2. **Business Logic**
   - Prevent registration when event is at capacity
   - Prevent duplicate registrations by the same user
   - Update `currentParticipants` count when registrations change
   - Handle concurrent registration attempts properly
   - Add proper validation and error messages

3. **Authorization**
   - Use the existing CASL permission system
   - Only authenticated users can register for events
   - Users can only cancel their own registrations
   - Add appropriate permission checks

### Frontend (React) Requirements

1. **Event Detail Page Enhancement**
   - Add registration button to `/event/$eventId` page
   - Show current registration status (registered/not registered)
   - Display available spots vs. total capacity
   - Handle different states: loading, success, error

2. **User Experience**
   - Show loading states during registration/cancellation
   - Display success/error messages clearly
   - Use optimistic updates with rollback on failure
   - Disable registration button when appropriate (full capacity, already registered)

3. **Events List Integration**
   - Show registration status indicators on the events list
   - Update the UI immediately after registration changes

### Technical Requirements

1. **Type Safety**
   - Proper TypeScript types for all new functionality
   - GraphQL schema updates with appropriate types
   - Frontend types should match GraphQL schema

2. **Error Handling**
   - Handle network errors gracefully
   - Show meaningful error messages to users
   - Implement proper error boundaries

3. **State Management**
   - Use TanStack Query for server state management
   - Implement proper cache invalidation
   - Handle optimistic updates correctly

## Deliverables

1. **Working Code**
   - All mutations and queries implemented
   - Frontend components updated with registration functionality
   - Proper error handling throughout

2. **Brief Documentation** (5-10 minutes)
   - Explain your approach to handling concurrent registrations
   - Describe how you implemented the authorization
   - Note any trade-offs or assumptions you made

## Getting Started

1. Run `bun install && bun run dev` to start the development servers
2. Explore the existing event pages at `http://localhost:5173`
3. Check the GraphQL playground at `http://localhost:4000/graphql`
4. Look at the existing schema in `apps/graphql/src/schema/index.ts`
5. The database already has sample events you can work with
6. **Testing Authentication**: Simulate logged-in users in development mode:
   - **In the Frontend UI**: Use the dev auth widget in the top-right corner of the app bar:
     - Click the dropdown to select a user (1-20)
     - Click "Login" to authenticate as that user
     - Click "Logout" to clear authentication
     - The page will reload automatically after login/logout
   - **In GraphQL Playground**: Add this HTTP header:
     ```json
     {
       "x-dev-user-id": "2"
     }
     ```
   - **In Browser Console**: Alternatively, run:
     ```javascript
     localStorage.setItem('dev-user-id', '2')
     ```
     Then refresh the page.
   
   Available user IDs: 1-20 (from seed data). User ID 1 is the admin.

## Tips

- The existing `eventParticipants` table is ready to use
- Look at existing GraphQL mutations for patterns
- The CASL permissions are defined in `libs/permissions/src/index.ts`
- TanStack Query is already configured in the frontend
- Use the existing UI components from `@testwelbi/ui` 

- Recent Events bug: Fixing the "Recent Events" ordering is part of Bonus Micro-Challenge D (`challenges/public/bonus-micro-challenges.md`). It's not required for this challenge — only fix it if you're bored.

## Scope Note

- Use the development authentication stub (dev auth widget / `x-dev-user-id`) for this challenge. Full authentication is implemented in Challenge 07; do not replace auth here.
- Avoid general performance optimizations; those are covered in Challenge 05. Only optimize what’s necessary for this feature.
- Do not fix issues that belong to other challenges.

## Performance Note

- The backend may respond slowly for large GraphQL queries (e.g., fetching many events). This behavior is intentional and is addressed in Challenge 05. Please do not optimize backend performance as part of this challenge.