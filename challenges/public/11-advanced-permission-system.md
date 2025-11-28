# Challenge 11: Advanced Permission System Extension

**Difficulty**: Medium-Hard  
**Estimated Time**: 3-4 hours  
**Type**: Full-stack permissions system with React and GraphQL integration

## Context

The Welbi wellness platform has a solid foundation for permissions using CASL, but needs to be extended with resource-level permissions, GraphQL field-level authorization, and React components for permission-based UI rendering. Your task is to build upon the existing `@testwelbi/permissions` library to create a comprehensive authorization system.

## Current State

The `@testwelbi/permissions` library contains:
- Basic CASL setup with role-based permissions
- User/Role/Permission type definitions
- Default role configurations (Super Admin, Admin, Manager, User, Guest)
- Basic ability creation and checking functions

## Requirements

### 1. Resource-Level Permissions
- Extend the existing system to support resource-specific permissions
- Implement hierarchical permissions (organization → department → team level)
- Add support for conditional permissions based on resource ownership
- Create permission inheritance and override mechanisms

### 2. GraphQL Integration
- Implement field-level authorization using GraphQL directives
- Create permission-aware GraphQL resolvers
- Add query filtering based on user permissions
- Implement mutation authorization with detailed error messages

### 3. React Permission Components
- Create declarative permission components for conditional rendering
- Implement permission-aware routing and navigation
- Add form field visibility based on permissions
- Create permission debugging tools for development

### 4. Advanced Permission Features
- Implement time-based permissions (temporary access)
- Add permission delegation and proxy capabilities
- Create audit logging for permission checks
- Support for dynamic permission evaluation

### 5. Wellness Domain Integration
- Extend permissions for wellness-specific resources (Events, Programs, Facilities)
- Implement facilitator-specific permissions
- Add location-based access controls
- Create participant vs. staff permission distinctions

## Deliverables

### Extended Library (`libs/permissions/`)
- [ ] Resource-level permission definitions
- [ ] Hierarchical permission system
- [ ] GraphQL directive implementations
- [ ] React hooks and components
- [ ] Permission audit utilities

### New Permission Types
```typescript
// Enhanced permission system
interface WellnessPermission extends Permission {
  resource?: 'Event' | 'Program' | 'Facility' | 'Participant';
  resourceId?: string;
  conditions?: {
    organizationId?: string;
    facilityId?: string;
    departmentId?: string;
    ownerId?: string;
    timeRange?: { start: Date; end: Date };
  };
}
```

### GraphQL Integration (`apps/graphql/`)
- [ ] Permission directives: `@auth`, `@requireRole`, `@requirePermission`
- [ ] Field-level authorization
- [ ] Permission-aware query filtering
- [ ] Detailed authorization error responses

### React Components (`apps/frontend/`)
- [ ] `<PermissionGuard>` component for conditional rendering
- [ ] `<ProtectedRoute>` for route-level protection
- [ ] `usePermissions` hook for permission checking
- [ ] Permission debugging overlay

### Documentation
- [ ] Permission system architecture guide
- [ ] How to add new permissions
- [ ] GraphQL authorization patterns
- [ ] React component usage examples

## Technical Requirements

### Must Use
- Existing `@testwelbi/permissions` library as foundation
- CASL for core permission logic
- GraphQL directives for field-level auth
- React Context for permission state management

### Key Features
- **Resource Hierarchy**: Organization → Facility → Department → Team
- **Performance**: Efficient permission checking with caching
- **Type Safety**: TypeScript interfaces for all permission types
- **Debugging**: Development tools for permission troubleshooting
- **Audit Trail**: Logging of permission checks and changes

## Bonus Features (+20 points each)

1. **Permission Analytics Dashboard** - Track permission usage and access patterns
2. **Role Template System** - Predefined role templates for common scenarios
3. **Permission API** - REST/GraphQL API for managing permissions
4. **Advanced Caching** - Redis-based permission caching system
5. **Permission Testing Framework** - Tools for testing permission scenarios

## Example Implementation Structure

### React Permission Components
```typescript
// Declarative permission checking
function EventManagement() {
  return (
    <div>
      <PermissionGuard 
        action="read" 
        resource="Event" 
        fallback={<AccessDenied />}
      >
        <EventList />
      </PermissionGuard>
      
      <PermissionGuard 
        action="create" 
        resource="Event"
        conditions={{ facilityId: currentFacility.id }}
      >
        <CreateEventButton />
      </PermissionGuard>
    </div>
  );
}
```

### GraphQL Schema with Permissions
```graphql
type Event {
  id: ID!
  title: String!
  description: String @requirePermission(action: "read", resource: "Event")
  facilitator: User @requireRole(roles: ["ADMIN", "MANAGER"])
  participants: [User!]! @auth
}

type Mutation {
  createEvent(input: CreateEventInput!): Event 
    @requirePermission(action: "create", resource: "Event")
  
  deleteEvent(id: ID!): Boolean 
    @requirePermission(action: "delete", resource: "Event")
    @requireOwnership(field: "createdBy")
}
```

### Enhanced Permission Checking
```typescript
// Advanced permission checking with context
const canManageEvent = usePermissions({
  action: 'update',
  resource: 'Event',
  resourceId: event.id,
  conditions: {
    facilityId: event.facilityId,
    ownerId: event.createdBy
  }
});

// Time-based permissions
const canAccessDuringBusinessHours = usePermissions({
  action: 'read',
  resource: 'Facility',
  conditions: {
    timeRange: { start: '09:00', end: '17:00' }
  }
});
``` 

## Scope Note

- This challenge focuses on permissions/authorization. Full authentication (login, tokens, sessions) is handled in Challenge 07 and should not be implemented here.
- Performance improvements not directly related to permission evaluation are part of Challenge 05.