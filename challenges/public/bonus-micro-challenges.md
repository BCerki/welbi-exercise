# Bonus Micro-Challenges

**Quick skill assessments (15-45 minutes each)**

> These are optional. Attempt them only if you have extra time; there is no expectation to complete them.

## Micro-Challenge A: Bug Hunt - Timezone Display Issues

**Difficulty**: Easy | **Estimated Time**: 15-30 minutes | **Focus**: Debugging & Attention to Detail

### The Problem

Users are reporting that event times are displaying incorrectly in different timezones. Events scheduled for 2:00 PM EST are showing as 7:00 PM for users in EST, and the times seem to be off by several hours for users in other timezones.

### Your Task

1. **Identify the Bug**: Find the root cause of the timezone display issue
2. **Fix the Implementation**: Correct the timezone handling
3. **Test the Solution**: Verify the fix works across different timezones
4. **Document the Issue**: Explain what was wrong and how you fixed it

### Getting Started

- Look at the `@testwelbi/time` library implementation
- Check how events are displayed in the frontend components
- Test with different browser timezone settings
- Consider both server-side and client-side timezone handling

### Expected Deliverable

Working timezone display with a brief explanation of the bug and fix.

---

## Micro-Challenge B: Code Review - Event Registration Component

**Difficulty**: Medium | **Estimated Time**: 30-45 minutes | **Focus**: Code Quality & Best Practices

### The Scenario

A junior developer has implemented an event registration component, but it needs review before merging. Your task is to conduct a thorough code review and provide constructive feedback.

### Your Task

1. **Review the Code**: Analyze the implementation for issues
2. **Identify Problems**: Find bugs, performance issues, and code quality problems
3. **Suggest Improvements**: Provide specific, actionable feedback
4. **Prioritize Issues**: Rank issues by severity and importance

### Focus Areas

- **Security**: Permission checks, input validation
- **Performance**: Unnecessary re-renders, inefficient queries
- **UX**: Loading states, error handling, accessibility
- **Code Quality**: TypeScript usage, patterns, maintainability
- **Testing**: Testability and edge cases

### Expected Deliverable

A comprehensive code review document with prioritized feedback and suggestions.

---

## Micro-Challenge C: API Integration - Google Calendar Sync

**Difficulty**: Medium | **Estimated Time**: 30-45 minutes | **Focus**: Integration & API Usage

### The Task

Implement a basic Google Calendar integration that allows users to sync their Welbi events to their personal Google Calendar.

### Requirements

1. **Research Integration**: Understand Google Calendar API requirements
2. **Design the Flow**: Plan the user experience for calendar sync
3. **Implement Basic Sync**: Create a proof-of-concept implementation
4. **Handle Errors**: Add proper error handling and user feedback

### Considerations

- **Authentication**: How to handle Google OAuth
- **Privacy**: What data to sync and user consent
- **Performance**: Batch operations and rate limiting
- **UX**: Clear user flow and feedback

### Expected Deliverable

Working proof-of-concept with documentation of the integration approach and any limitations or considerations for production implementation.

---

## Micro-Challenge D: Bug Fix - Recent Events Display

**Difficulty**: Easy | **Estimated Time**: 15-30 minutes | **Focus**: Logic Debugging & Data Sorting

### The Problem

The "Recent Events" section is currently displaying the first 5 events in the database instead of the most recent 5 events that have occurred. Users expect to see the latest events they've attended or that have recently happened, but instead they're seeing old events from when the system was first set up.

### Your Task

1. **Locate the Issue**: Find where recent events are being queried and displayed
2. **Identify the Logic Error**: Determine why it's showing first events instead of recent ones
3. **Fix the Query**: Correct the sorting/filtering logic to show truly recent events
4. **Verify the Fix**: Test that the most recent events now appear correctly

### Getting Started

- Look for recent events queries in the API endpoints
- Check frontend components that display recent events
- Consider what "recent" means (by date? by attendance? by creation time?)
- Test with a variety of events to ensure proper sorting

### Expected Deliverable

Fixed recent events display showing the actual last 5 events that happened, with a brief explanation of what was wrong in the original implementation.

