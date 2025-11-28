# Challenge 2: Advanced Search & Filtering

**Difficulty**: Medium-Hard | **Estimated Time**: 2-4 hours | **Focus**: Data Handling & Performance

## Context

The current events page shows all events with basic pagination, but users need sophisticated search and filtering capabilities to find events that match their interests, schedule, and care requirements. You need to build a comprehensive search system that can handle complex queries efficiently.

## Current State

- Basic `EventFiltersInput` exists but is not fully implemented
- Events query supports limited filtering
- Frontend has a simple events list without advanced search UI
- Database has rich relational data (wellness dimensions, hobbies, tags, locations, facilitators)
- No full-text search or complex filtering UI

## Your Task

Build an advanced search and filtering system that allows users to:
1. Search events by text (title, description)
2. Filter by multiple criteria simultaneously
3. Sort results by various fields
4. Navigate through paginated results efficiently
5. Share filtered views via URL

## Requirements

### Backend (GraphQL) Requirements

1. **Enhanced Search Query**
   ```graphql
   query SearchEvents(
     $filters: EventFiltersInput
     $sort: [EventSortInput!]
     $search: String
     $first: Int
     $after: String
   ) {
     events(filters: $filters, sort: $sort, search: $search, first: $first, after: $after) {
       edges {
         node { ... }
         cursor
       }
       pageInfo {
         hasNextPage
         hasPreviousPage
         startCursor
         endCursor
       }
       totalCount
     }
   }
   ```

2. **Search Capabilities**
   - Full-text search across event titles and descriptions
   - Case-insensitive search with partial matching
   - Search result highlighting (bonus)
   - Search relevance scoring (bonus)

3. **Advanced Filtering**
   - Date range filtering with timezone awareness
   - Multi-select filters for:
     - Wellness dimensions
     - Hobbies
     - Tags
     - Levels of care
     - Facilitators
     - Locations
     - Event series
   - Registration status filters (has spots available, registration required, etc.)
   - Event status filters (scheduled, cancelled, completed)

4. **Sorting & Pagination**
   - Sort by: start time, title, created date, participant count, relevance
   - Ascending/descending options
   - Cursor-based pagination for performance
   - Total count for pagination UI

5. **Performance Optimization**
   - Efficient database queries with proper joins
   - Avoid N+1 query problems
   - Consider database indexing strategies
   - Query result caching (bonus)

### Frontend (React) Requirements

1. **Search Interface**
   - Prominent search input with debouncing
   - Auto-complete suggestions (bonus)
   - Search result highlighting
   - Clear search functionality

2. **Filter Panel**
   - Collapsible/expandable filter sections
   - Multi-select dropdowns with search
   - Date range picker with calendar
   - Applied filters display with remove functionality
   - Filter count indicators
   - "Clear all filters" functionality

3. **Results Display**
   - Grid/list view toggle (bonus)
   - Sort dropdown with clear indicators
   - Loading states during search/filter changes
   - Empty states with helpful messaging
   - Results count display

4. **URL State Management**
   - All search/filter state reflected in URL
   - Shareable filtered URLs
   - Browser back/forward navigation support
   - Bookmarkable search results

5. **Performance Considerations**
   - Debounced search input (300-500ms)
   - Efficient re-rendering with proper memoization
   - Virtualized results list for large datasets (bonus)
   - Progressive loading of filter options

### User Experience Requirements

1. **Responsive Design**
   - Mobile-friendly filter interface
   - Collapsible filters on smaller screens
   - Touch-friendly interactions

2. **Accessibility**
   - Proper ARIA labels for screen readers
   - Keyboard navigation support
   - Focus management
   - High contrast support

3. **Progressive Enhancement**
   - Basic functionality works without JavaScript
   - Graceful degradation for unsupported features
   - Loading states for all async operations

## Deliverables

1. **Working Implementation**
   - Complete search and filtering functionality
   - Responsive UI with all required features
   - Proper error handling and loading states

2. **Performance Documentation**
   - Explanation of database indexing strategy
   - Query optimization approaches used
   - Frontend performance considerations

3. **Brief Technical Summary**
   - Architecture decisions made
   - Trade-offs and compromises
   - Areas for future improvement

## Getting Started

1. Explore the existing events query in `apps/graphql/src/schema/index.ts`
2. Look at the database schema in `libs/drizzle/src/schema.ts`
3. Check the current events page at `/` to understand the baseline
4. Review the existing `EventFiltersInput` type for extension points

## Tips

- Use Drizzle ORM's query builder for complex joins
- The existing UI library has components you can use
- Consider using React Hook Form for complex filter state
- TanStack Query is configured for caching and background updates
- SQLite FTS (Full-Text Search) can be used for text search 

## Scope Note

- Authentication is handled in Challenge 07 (Authentication System). Use the development auth stub for this challenge; do not implement/replace auth here.
- Broad performance optimization is covered in Challenge 05 (Performance). Optimize queries as needed for this feature, but do not undertake general performance work here.
- If you notice unrelated bugs (e.g., “Recent Events” sorting), those are covered by micro-challenges and should not be fixed as part of this challenge.