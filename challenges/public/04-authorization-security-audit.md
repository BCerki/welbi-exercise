# Challenge 4: Authorization & Security Audit

**Difficulty**: Medium | **Estimated Time**: 1-2 hours | **Focus**: Security & Permissions

## Context

Security is paramount in healthcare applications. The existing codebase has a CASL-based permission system, but it needs a thorough security review and improvements. You need to audit the current implementation, identify vulnerabilities, and implement security enhancements.

## Current State

- CASL-based permission system exists in `libs/permissions`
- Basic role definitions are implemented (admin, manager, user, guest)
- GraphQL resolvers may have inconsistent authorization
- No field-level authorization implemented
- No rate limiting or audit logging
- Authentication context exists but may not be properly utilized

## Your Task

Conduct a comprehensive security audit and implement improvements:
1. Analyze the existing permission system for vulnerabilities
2. Implement missing authorization checks
3. Add field-level security to sensitive GraphQL fields
4. Implement security best practices
5. Create security documentation for the team

## Requirements

### Security Analysis Phase

1. **Permission System Audit**
   - Review the CASL configuration in `libs/permissions/src/index.ts`
   - Identify potential permission bypass scenarios
   - Check for overly broad permissions
   - Analyze role hierarchy and inheritance issues

2. **GraphQL Security Review**
   - Audit all GraphQL resolvers for authorization checks
   - Identify missing authorization on queries/mutations
   - Check for information disclosure vulnerabilities
   - Review input validation and sanitization

3. **Authentication Analysis**
   - Review authentication context usage
   - Check for session management issues
   - Analyze JWT token handling (if implemented)
   - Identify authentication bypass possibilities

### Implementation Phase

1. **Fix Identified Vulnerabilities**
   - Implement missing authorization checks
   - Add proper input validation
   - Fix any permission bypass scenarios
   - Secure sensitive data exposure

2. **Field-Level Authorization**
   ```typescript
   // Example: Secure sensitive user fields
   const UserType = builder.objectType(User, {
     fields: (t) => ({
       id: t.exposeID('id'),
       email: t.exposeString('email', {
         authScopes: { user: true }, // Only expose to authenticated users
         authorize: (user, args, context) => {
           // Additional authorization logic
         }
       }),
       // ... other fields
     })
   });
   ```

3. **Rate Limiting Implementation**
   - Add rate limiting to sensitive operations
   - Implement per-user rate limits
   - Add rate limiting to authentication endpoints
   - Consider different limits for different user roles

4. **Audit Logging**
   - Log all authentication attempts
   - Log sensitive operations (user creation, permission changes)
   - Log failed authorization attempts
   - Implement structured logging with proper metadata

5. **Security Middleware**
   - Create consistent authorization middleware
   - Add CORS configuration
   - Implement security headers
   - Add request sanitization

### Advanced Security Features

1. **Permission Caching & Performance**
   - Implement efficient permission checking
   - Add caching for expensive permission calculations
   - Optimize database queries for permission checks
   - Consider permission preloading strategies

2. **Dynamic Permissions**
   - Implement context-aware permissions
   - Add time-based permission restrictions
   - Implement resource-specific permissions
   - Add delegation and temporary permissions

3. **Security Testing**
   - Create unit tests for permission scenarios
   - Add integration tests for authentication flows
   - Implement security test cases
   - Add edge case testing for authorization

## Deliverables

1. **Security Audit Report**
   - List of identified vulnerabilities with severity levels
   - Detailed analysis of permission system weaknesses
   - Recommendations for immediate fixes
   - Long-term security improvement roadmap

2. **Fixed Implementation**
   - All critical vulnerabilities addressed
   - Improved authorization throughout the application
   - Field-level security implemented
   - Rate limiting and audit logging added

3. **Security Documentation**
   - Security guidelines for development team
   - Authentication and authorization patterns
   - Common security pitfalls to avoid
   - Testing strategies for security features

4. **Test Suite**
   - Unit tests for permission scenarios
   - Integration tests for authentication
   - Security-focused test cases
   - Edge case testing

## Getting Started

1. Start with the permission system in `libs/permissions/src/index.ts`
2. Review GraphQL resolvers in `apps/graphql/src/schema/index.ts`
3. Check authentication context in `apps/graphql/src/context.ts`
4. Look for existing authorization usage patterns
5. Consider using tools like `eslint-plugin-security` for static analysis

## Common Vulnerabilities to Look For

- **Insecure Direct Object References**: Users accessing resources they shouldn't
- **Missing Authorization**: Endpoints without proper permission checks
- **Information Disclosure**: Exposing sensitive data to unauthorized users
- **Privilege Escalation**: Users gaining higher permissions than intended
- **Injection Attacks**: SQL injection, GraphQL injection, XSS
- **Authentication Bypass**: Ways to circumvent authentication requirements

## Tips

- Use the principle of least privilege
- Implement defense in depth
- Validate all inputs, sanitize all outputs
- Don't rely on client-side validation alone
- Log security events for monitoring
- Test authorization both at the API and database level 

## Scope Note

- Focus on authorization and security hardening. Full authentication implementation is covered in Challenge 07; use the existing development auth stub where needed.
- Performance tuning unrelated to security is addressed in Challenge 05.
- Avoid fixing issues owned by other challenges.