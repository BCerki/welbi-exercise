# Challenge 7: Authentication System Implementation

**Difficulty**: Medium-Hard | **Estimated Time**: 3-4 hours | **Focus**: Security & Authentication

## Context

The application currently has a permission system and a development-only authentication stub, but no production-ready authentication mechanism. Users can't truly log in, create accounts, or manage their sessions. You need to replace the stub with a complete authentication system that integrates with the existing CASL permission framework.

## Current State

- CASL permission system exists but isn't connected to real authentication
- A development authentication stub is available (dev auth widget in the frontend app bar and `x-dev-user-id` header/localStorage for GraphQL). Other challenges rely on this stub.
- No user registration or login functionality
- No password management or security
- No session management or JWT tokens
- GraphQL context has user but it's not populated from real auth
- No authentication middleware or guards

## Your Task

Implement a complete authentication system that provides:
1. User Registration & Login with secure password handling
2. JWT token management with refresh capabilities
3. Integration with existing CASL permissions
4. Password reset and security features
5. Frontend authentication UI and state management

## Requirements

### Backend Requirements

1. **User Registration & Login**
   - Secure password hashing with bcrypt
   - Input validation and sanitization
   - JWT token generation and validation
   - Refresh token mechanism
   - Account lockout after failed attempts

2. **GraphQL Authentication**
   - Authentication mutations (register, login, logout)
   - Protected resolvers with authentication checks
   - Integration with existing CASL permissions
   - Token refresh functionality

3. **Security Features**
   - Rate limiting on authentication endpoints
   - Password strength validation
   - Password reset with secure tokens
   - Audit logging for authentication events

### Frontend Requirements

1. **Authentication UI**
   - Login and registration forms
   - Password reset flow
   - Account settings page
   - Loading states and error handling

2. **State Management**
   - Authentication context/store
   - Token storage and automatic refresh
   - Route protection with authentication
   - Automatic logout on token expiration

## Deliverables

1. Complete authentication system with JWT tokens
2. Frontend authentication UI and state management
3. Integration with existing CASL permissions
4. Security documentation and testing

## Getting Started

1. Design database schema for authentication
2. Implement password hashing and JWT tokens
3. Create GraphQL authentication mutations
4. Build frontend authentication components
5. Test security measures 

## Scope Note

- This challenge replaces the development authentication stub with a real system.
- Do not modify or remove the stub while working on other challenges; they depend on it.
- If you are working on other challenges, continue using the dev auth widget/`x-dev-user-id` header. Implement the real auth here only.