import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Card, Box, Typography, CardContent, Calendar, Grid, GridItem } from '@testwelbi/ui'
import type { CalendarEvent } from '@testwelbi/ui'
import { graphql } from '../graphql'
import { execute } from '../graphql/execute'
import React from 'react'

// Define search params type
type SearchParams = {
  year?: number
  month?: number // Calendar month (1-12), not JavaScript month (0-11)
}

// Type-safe GraphQL queries using generated client
const HealthQuery = graphql(`
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
`)

const EventsQuery = graphql(`
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
`)

const CalendarEventsQuery = graphql(`
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
`)

function HomePage() {
  const search = Route.useSearch() as SearchParams
  const navigate = Route.useNavigate()
  
  // Create initial date from URL params or default to current date
  const initialDate = React.useMemo(() => {
    if (search.year && search.month !== undefined) {
      // Convert calendar month (1-12) to JavaScript month (0-11)
      return new Date(search.year, search.month - 1)
    }
    return new Date()
  }, [search.year, search.month])

  const { data: healthData, isLoading: healthLoading, error: healthError } = useQuery({
    queryKey: ['health'],
    queryFn: () => execute(HealthQuery),
  })

  const { data: eventsData, isLoading: eventsLoading, error: eventsError } = useQuery({
    queryKey: ['events'],
    queryFn: () => execute(EventsQuery, { limit: 5 }),
  })

  const { data: calendarEventsData, isLoading: calendarEventsLoading, error: calendarEventsError } = useQuery({
    queryKey: ['calendar-events'],
    queryFn: () => execute(CalendarEventsQuery, { limit: 3000 }),
  })

  // Debug logging for raw data
  React.useEffect(() => {
    console.log('🔍 Raw GraphQL Responses:')
    console.log('Events data (sidebar):', eventsData)
    console.log('Calendar events data:', calendarEventsData)
    console.log('Events loading states:', { eventsLoading, calendarEventsLoading })
    console.log('Events errors:', { eventsError, calendarEventsError })
  }, [eventsData, calendarEventsData, eventsLoading, calendarEventsLoading, eventsError, calendarEventsError])

  // Transform GraphQL events to Calendar events
  const calendarEvents: CalendarEvent[] = React.useMemo(() => {
    console.log('🔄 Transforming calendar events...')
    
    if (!calendarEventsData?.events) {
      console.log('❌ No calendar events data available')
      console.log('📊 Raw calendarEventsData structure:', calendarEventsData)
      return []
    }
    
    console.log('📊 Raw calendar events from GraphQL:', calendarEventsData.events)
    
    const transformed = calendarEventsData.events.map(event => {
      const transformedEvent = {
        id: event.id!,
        title: event.title!,
        startTime: event.startTime!,
        endTime: event.endTime!,
        status: event.status as 'scheduled' | 'cancelled' | 'completed',
        description: event.description || undefined,
        currentParticipants: event.currentParticipants || undefined,
        maxParticipants: event.maxParticipants || undefined,
      }
      
      console.log('🔄 Transformed event:', {
        id: transformedEvent.id,
        title: transformedEvent.title,
        startTime: transformedEvent.startTime,
        startDate: new Date(transformedEvent.startTime).toLocaleDateString(),
        status: transformedEvent.status
      })
      
      return transformedEvent
    })
    
    console.log('✅ Final transformed calendar events:', transformed)
    return transformed
  }, [calendarEventsData])

  const handleEventClick = (event: CalendarEvent) => {
    console.log('📅 Navigating to event detail:', event.id)
    navigate({
      to: '/event/$eventId',
      params: { eventId: event.id },
    })
  }

  const handleDateClick = (date: Date) => {
    console.log('Date clicked:', date.toDateString())
  }

  const handleNavigateMonth = (direction: 'prev' | 'next', currentYear: number, currentMonth: number) => {
    let newYear = currentYear
    let newMonth = currentMonth
    
    if (direction === 'prev') {
      newMonth = currentMonth - 1
      if (newMonth < 0) {
        newMonth = 11
        newYear = currentYear - 1
      }
    } else {
      newMonth = currentMonth + 1
      if (newMonth > 11) {
        newMonth = 0
        newYear = currentYear + 1
      }
    }
    
    console.log('Month changed:', { year: newYear, jsMonth: newMonth, calendarMonth: newMonth + 1 })
    
    // Use TanStack Router's navigate function to update search params
    // Convert JavaScript month (0-11) to calendar month (1-12) for URL
    navigate({
      to: '/',
      search: {
        year: newYear,
        month: newMonth + 1,
      },
    })
  }

  // Debug logging for sidebar events
  React.useEffect(() => {
    console.log('📋 SIDEBAR EVENTS DEBUG:')
    console.log('Raw sidebar events data:', eventsData?.events)
    console.log('Sidebar events count:', eventsData?.events?.length || 0)
    console.log('Raw eventsData structure:', eventsData)
    
    if (eventsData?.events) {
      eventsData.events.forEach((event, index) => {
        console.log(`📋 Sidebar Event ${index + 1}:`, {
          id: event.id,
          title: event.title,
          startTime: event.startTime,
          startDate: new Date(event.startTime).toLocaleDateString(),
          startDateTime: new Date(event.startTime).toLocaleString(),
          status: event.status
        })
      })
    }
  }, [eventsData])

  // Debug logging for calendar
  React.useEffect(() => {
    console.log('📅 CALENDAR EVENTS DEBUG:')
    console.log('Calendar events passed to component:', calendarEvents)
    console.log('Calendar events count:', calendarEvents.length)
    console.log('Current calendar date:', initialDate.toLocaleDateString())
    console.log('Current calendar month/year:', initialDate.getMonth() + 1, initialDate.getFullYear())
    
    if (calendarEvents.length > 0) {
      console.log('📅 Calendar events by date:')
      calendarEvents.forEach((event, index) => {
        console.log(`📅 Calendar Event ${index + 1}:`, {
          id: event.id,
          title: event.title,
          startTime: event.startTime,
          startDate: new Date(event.startTime).toLocaleDateString(),
          startDateTime: new Date(event.startTime).toLocaleString(),
          status: event.status
        })
      })
    }
  }, [calendarEvents, initialDate])

  return (
    <Box>
      <Typography $variant="h2" $gutterBottom>
        Welcome to TestWelbi
      </Typography>
      
      <Typography $variant="h5" $gutterBottom>
        A modern monorepo with React and GraphQL
      </Typography>

      <Grid $columns={12} $gap={4}>
        {/* System Status */}
        <GridItem $colSpan={12}>
          <Card $variant="primary">
            <CardContent>
              <Typography $variant="h6" $gutterBottom>
                Backend Connection Status
              </Typography>
              
              {healthLoading && <Typography>Checking backend connection...</Typography>}
              
              {healthError && (
                <Typography color="error">
                  Backend connection failed: {healthError.message}
                </Typography>
              )}
              
              {healthData?.health && (
                <>
                  <Typography color="success.main">
                    ✅ Backend is connected successfully! Health status: {healthData.health.status}
                  </Typography>
                  {healthData.health.currentUser && (
                    <Typography color="success.main" style={{ marginTop: '8px' }}>
                      Currently logged in as {healthData.health.currentUser.name}
                    </Typography>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </GridItem>

        {/* Calendar */}
        <GridItem $colSpan={8}>
          <Card $variant="primary">
            <CardContent>
              <Typography $variant="h6" $gutterBottom>
                Events Calendar
              </Typography>
              
              {calendarEventsLoading && <Typography>Loading calendar events...</Typography>}
              
              {calendarEventsError && (
                <Typography color="error">
                  Failed to load calendar events: {calendarEventsError.message}
                </Typography>
              )}
              
              {!calendarEventsLoading && (
                <Calendar
                  events={calendarEvents}
                  onEventClick={handleEventClick}
                  onDateClick={handleDateClick}
                  onNavigateMonth={handleNavigateMonth}
                  initialDate={initialDate}
                />
              )}
            </CardContent>
          </Card>
        </GridItem>

        {/* Recent Events List */}
        <GridItem $colSpan={4}>
          <Card $variant="primary">
            <CardContent>
              <Typography $variant="h6" $gutterBottom>
                Recent Events
              </Typography>
              
              {eventsLoading && <Typography>Loading events...</Typography>}
              
              {eventsError && (
                <Typography color="error">
                  Failed to load events: {eventsError.message}
                </Typography>
              )}
              
              {eventsData?.events && eventsData.events.length > 0 ? (
                <Box>
                  {eventsData.events.map((event) => (
                    <Box 
                      key={event.id} 
                      style={{ 
                        marginBottom: '16px', 
                        padding: '12px', 
                        border: '1px solid #e0e0e0', 
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => {
                        console.log('📋 Navigating to event detail from sidebar:', event.id)
                        navigate({
                          to: '/event/$eventId',
                          params: { eventId: event.id! },
                        })
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f5f5f5'
                        e.currentTarget.style.borderColor = '#2196F3'
                        e.currentTarget.style.transform = 'translateY(-1px)'
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                        e.currentTarget.style.borderColor = '#e0e0e0'
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <Typography $variant="body1" style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                        {event.title}
                      </Typography>
                      <Typography $variant="body2" style={{ marginBottom: '4px' }}>
                        {new Date(event.startTime).toLocaleDateString()} at {new Date(event.startTime).toLocaleTimeString()}
                      </Typography>
                      <Typography $variant="body2">
                        Status: {event.status}
                      </Typography>
                      {event.currentParticipants !== null && (
                        <Typography $variant="body2">
                          Participants: {event.currentParticipants}{event.maxParticipants && `/${event.maxParticipants}`}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              ) : (
                eventsData && <Typography>No events found.</Typography>
              )}
            </CardContent>
          </Card>
        </GridItem>

        {/* Tech Stack */}
        <GridItem $colSpan={12}>
          <Card $variant="primary">
            <CardContent>
              <Typography $variant="h6" $gutterBottom>
                Technologies Used:
              </Typography>
              <Grid $columns={3} $gap={2}>
                <GridItem $colSpan={1}>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    <li>React with TypeScript</li>
                    <li>TanStack Router for routing</li>
                    <li>TanStack Query for data fetching</li>
                  </ul>
                </GridItem>
                <GridItem $colSpan={1}>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    <li>GraphQL with Codegen</li>
                    <li>Base-UI components</li>
                    <li>Custom @testwelbi/ui library</li>
                  </ul>
                </GridItem>
                <GridItem $colSpan={1}>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    <li>GraphQL backend with Pothos</li>
                    <li>CASL for permissions</li>
                    <li>Rush for monorepo management</li>
                  </ul>
                </GridItem>
              </Grid>
            </CardContent>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  )
}

export const Route = createFileRoute('/')({
  component: HomePage,
  validateSearch: (search) => {
    const result: { year?: number; month?: number } = {}
    
    if (search.year !== undefined) {
      const year = Number(search.year)
      if (!isNaN(year) && year >= 1900 && year <= 2100) {
        result.year = year
      }
    }
    
    if (search.month !== undefined) {
      const month = Number(search.month)
      // Validate calendar month (1-12)
      if (!isNaN(month) && month >= 1 && month <= 12) {
        result.month = month
      }
    }
    
    return result
  },
}) 