# Challenge 3: Real-time Notifications System

**Difficulty**: Hard | **Estimated Time**: 3-4 hours | **Focus**: System Design & Architecture

## Context

Users need to receive real-time updates about events they're interested in or registered for. This includes notifications when events are updated, cancelled, when spots become available, or when they're added to waiting lists. You need to design and implement a comprehensive real-time notification system.

## Current State

- Events can be viewed and basic information is displayed
- No real-time updates when events change
- No notification system for users
- No user preference management for notifications
- No persistence of notifications for offline users

## Your Task

Design and implement a real-time notification system that provides:
1. Real-time event updates to interested users
2. Persistent notification storage for offline users
3. User preference management for notification types
4. Multiple notification delivery methods
5. Scalable architecture for high-traffic scenarios

## Requirements

### System Design Requirements

1. **Technology Choice & Justification**
   - Choose your real-time technology (WebSockets, Server-Sent Events, GraphQL Subscriptions)
   - Document your choice with trade-offs analysis
   - Consider scalability, browser support, and complexity
   - Plan for fallback mechanisms

2. **Notification Types**
   - Event updates (time, location, details changed)
   - Event cancellations
   - Registration confirmations
   - Waiting list updates (spot available)
   - Capacity warnings (event filling up)
   - Reminder notifications (event starting soon)

3. **Architecture Considerations**
   - How to handle connection management
   - Message queuing and delivery guarantees
   - User targeting and subscription management
   - Offline scenario handling
   - Reconnection logic and backoff strategies

### Backend Requirements

1. **Database Schema**
   ```sql
   -- Design tables for:
   -- - notifications (id, type, content, userId, eventId, read, createdAt)
   -- - notification_preferences (userId, type, enabled, method)
   -- - notification_subscriptions (userId, eventId, types)
   ```

2. **Real-time Infrastructure**
   - WebSocket connection management
   - User session tracking
   - Message broadcasting to specific users
   - Connection cleanup and error handling

3. **GraphQL Integration**
   - Add subscription support to GraphQL schema
   - Implement notification queries and mutations
   - Add notification preference management
   - Real-time event update subscriptions

4. **Notification Service**
   - Notification creation and queuing
   - User targeting logic
   - Delivery method selection (real-time vs. stored)
   - Retry logic for failed deliveries

### Frontend Requirements

1. **Notification UI Components**
   - Toast notifications for immediate alerts
   - Notification center/dropdown with history
   - Notification badge with unread count
   - In-app notification banners for important updates

2. **Real-time Connection Management**
   - WebSocket connection establishment
   - Connection state indicator
   - Automatic reconnection logic
   - Graceful degradation when offline

3. **User Preferences**
   - Notification settings page
   - Toggle notifications by type
   - Delivery method preferences
   - Do not disturb time settings

4. **Notification Interaction**
   - Mark as read/unread functionality
   - Dismiss individual notifications
   - Clear all notifications
   - Click-through to related events

5. **Offline Support**
   - Queue notifications when offline
   - Sync when connection restored
   - Cache important notifications locally
   - Show connection status

### Performance & Scalability Requirements

1. **Connection Management**
   - Efficient WebSocket connection pooling
   - Proper connection cleanup
   - Memory usage optimization
   - Connection limit handling

2. **Message Delivery**
   - Batch notifications when appropriate
   - Rate limiting for spam prevention
   - Priority-based delivery
   - Duplicate prevention

3. **Database Performance**
   - Efficient queries for user notifications
   - Proper indexing for notification lookups
   - Cleanup of old notifications
   - Pagination for notification history

## Deliverables

1. **Working Implementation**
   - Complete real-time notification system
   - All UI components functional
   - Proper error handling and fallbacks

2. **System Design Documentation**
   - Architecture diagram
   - Technology choice justification
   - Scalability considerations
   - Performance optimizations implemented

3. **Technical Deep-dive**
   - Connection management strategy
   - Message delivery guarantees
   - Offline handling approach
   - Testing strategy for real-time features

## Getting Started

1. Research real-time options for your chosen stack
2. Plan your database schema additions
3. Consider using libraries like Socket.io, ws, or GraphQL subscriptions
4. Think about how to integrate with the existing CASL permission system
5. Plan for testing real-time features (challenging but important)

## Tips

- Start with a simple WebSocket implementation before adding complexity
- Use Redis or similar for message queuing in production scenarios
- Consider using a service worker for offline notification handling
- Implement proper error boundaries for WebSocket failures
- Test with multiple browser tabs to simulate multiple users 

## Scope Note

- Authentication is implemented in Challenge 07. For this challenge, continue using the development auth stub; do not build full authentication here.
- General performance work (beyond what’s necessary for a functional real-time system) is covered by Challenge 05.
- Do not fix unrelated issues from other challenges as part of this one.