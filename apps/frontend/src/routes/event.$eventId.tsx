import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { 
  Card, Box, Typography, CardContent, Grid, GridItem,
  StatusBadge, InfoBox, ProgressBar, ProgressBarFill, ActionButton, 
  PageContainer, Spacer, Flex 
} from '@testwelbi/ui'
import { graphql } from '../graphql'
import { execute } from '../graphql/execute'

// GraphQL query for a single event with all details
const EventDetailQuery = graphql(`
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
`)

function EventDetailPage() {
  const { eventId } = Route.useParams()
  
  const { data: eventData, isLoading, error } = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => execute(EventDetailQuery, { id: eventId }),
  })

  if (isLoading) {
    return (
      <PageContainer>
        <Typography $variant="h4" $gutterBottom>
          Loading Event Details...
        </Typography>
      </PageContainer>
    )
  }

  if (error) {
    return (
      <PageContainer>
        <Typography $variant="h4" $gutterBottom $color="error">
          Error Loading Event
        </Typography>
        <Typography $variant="body1">
          {error instanceof Error ? error.message : 'Unknown error occurred'}
        </Typography>
      </PageContainer>
    )
  }

  if (!eventData?.event) {
    return (
      <PageContainer>
        <Typography $variant="h4" $gutterBottom>
          Event Not Found
        </Typography>
        <Typography $variant="body1">
          The requested event could not be found.
        </Typography>
      </PageContainer>
    )
  }

  const event = eventData.event
  const startDate = new Date(event.startTime)
  const endDate = new Date(event.endTime)
  const createdDate = new Date(event.createdAt)
  const updatedDate = new Date(event.updatedAt)

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Scheduled'
      case 'completed': return 'Completed'
      case 'cancelled': return 'Cancelled'
      default: return status
    }
  }

  return (
    <PageContainer>
      {/* Header */}
      <Box>
        <Typography $variant="h3" $gutterBottom>
          {event.title}
        </Typography>
        <Flex $align="center" $gap="md">
          <StatusBadge $status={event.status as 'scheduled' | 'completed' | 'cancelled' || 'scheduled'}>
            {getStatusText(event.status || 'scheduled')}
          </StatusBadge>
          {event.registrationRequired && (
            <StatusBadge $status="warning">
              Registration Required
            </StatusBadge>
          )}
          {event.allDay && (
            <StatusBadge $status="info">
              All Day Event
            </StatusBadge>
          )}
        </Flex>
        <Spacer $size="md" />
        
        {event.description && (
          <Typography $variant="h6" $color="muted">
            {event.description}
          </Typography>
        )}
      </Box>
      <Spacer $size="xl" />

      <Grid $columns={12} $gap={4}>
        {/* Date & Time Information */}
        <GridItem $colSpan={8}>
          <Card $variant="primary">
            <CardContent>
              <Typography $variant="h5" $gutterBottom>
                📅 Date & Time
              </Typography>
              
              <Grid $columns={2} $gap={3}>
                <GridItem $colSpan={1}>
                  <Box>
                    <Typography $variant="h6" $color="muted">
                      Start Time
                    </Typography>
                    <Spacer $size="xs" />
                    <Typography $variant="body1" $fontSize="xl" $fontWeight="bold">
                      {startDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </Typography>
                    <Typography $variant="body1" $fontSize="base" $color="muted">
                      {startDate.toLocaleTimeString('en-US', { 
                        hour: 'numeric', 
                        minute: '2-digit',
                        hour12: true 
                      })}
                    </Typography>
                  </Box>
                  <Spacer $size="md" />
                </GridItem>
                
                <GridItem $colSpan={1}>
                  <Box>
                    <Typography $variant="h6" $color="muted">
                      End Time
                    </Typography>
                    <Spacer $size="xs" />
                    <Typography $variant="body1" $fontSize="xl" $fontWeight="bold">
                      {endDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </Typography>
                    <Typography $variant="body1" $fontSize="base" $color="muted">
                      {endDate.toLocaleTimeString('en-US', { 
                        hour: 'numeric', 
                        minute: '2-digit',
                        hour12: true 
                      })}
                    </Typography>
                  </Box>
                  <Spacer $size="md" />
                </GridItem>
              </Grid>

              {event.duration && (
                <InfoBox $variant="tertiary">
                  <Typography $variant="h6" $color="muted">
                    Duration
                  </Typography>
                  <Spacer $size="xs" />
                  <Typography $variant="body1" $fontSize="base">
                    {Math.floor(event.duration / 60)} hours {event.duration % 60} minutes
                  </Typography>
                </InfoBox>
              )}
            </CardContent>
          </Card>
        </GridItem>

        {/* Participation Information */}
        <GridItem $colSpan={4}>
          <Card $variant="primary">
            <CardContent>
              <Typography $variant="h5" $gutterBottom>
                👥 Participation
              </Typography>
              
              {event.maxParticipants ? (
                <>
                  <Box>
                    <Typography $variant="h6" $color="muted">
                      Capacity
                    </Typography>
                    <Spacer $size="sm" />
                    <Flex $align="center" $gap="sm">
                      <Typography $variant="h4" $color="primary">
                        {event.currentParticipants || 0}
                      </Typography>
                      <Typography $variant="h6" $color="muted">
                        / {event.maxParticipants}
                      </Typography>
                    </Flex>
                    <Spacer $size="sm" />
                    
                    {/* Progress Bar */}
                    <ProgressBar>
                      <ProgressBarFill style={{ 
                        width: `${Math.min(((event.currentParticipants || 0) / event.maxParticipants) * 100, 100)}%`
                      }} />
                    </ProgressBar>
                  </Box>
                  <Spacer $size="md" />

                  {event.availableSpots !== null && event.availableSpots !== undefined && (
                    <InfoBox $variant={event.availableSpots > 0 ? 'success' : 'error'}>
                      <Typography $variant="body1" $fontWeight="bold" $color={event.availableSpots > 0 ? 'success' : 'error'}>
                        {event.availableSpots > 0 
                          ? `${event.availableSpots} spots available` 
                          : 'Fully booked'
                        }
                      </Typography>
                    </InfoBox>
                  )}
                </>
              ) : (
                <Typography $variant="body1" $color="muted">
                  No capacity limit
                </Typography>
              )}

              {event.registrationDeadline && (
                <>
                  <Spacer $size="md" />
                  <Box>
                    <Typography $variant="h6" $color="muted">
                      Registration Deadline
                    </Typography>
                    <Spacer $size="xs" />
                    <Typography $variant="body1">
                      {new Date(event.registrationDeadline).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </Typography>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </GridItem>

        {/* Additional Details */}
        <GridItem $colSpan={12}>
          <Card $variant="primary">
            <CardContent>
              <Typography $variant="h5" $gutterBottom>
                📋 Additional Information
              </Typography>
              
              <Grid $columns={3} $gap={3}>
                <GridItem $colSpan={1}>
                  <InfoBox $variant="default">
                    <Typography $variant="h6" $color="muted">
                      Event ID
                    </Typography>
                    <Spacer $size="sm" />
                    <Typography $variant="body1">
                      {event.id}
                    </Typography>
                  </InfoBox>
                </GridItem>
                
                <GridItem $colSpan={1}>
                  <InfoBox $variant="default">
                    <Typography $variant="h6" $color="muted">
                      Created
                    </Typography>
                    <Spacer $size="sm" />
                    <Typography $variant="body1">
                      {createdDate.toLocaleDateString()}
                    </Typography>
                  </InfoBox>
                </GridItem>
                
                <GridItem $colSpan={1}>
                  <InfoBox $variant="default">
                    <Typography $variant="h6" $color="muted">
                      Last Updated
                    </Typography>
                    <Spacer $size="sm" />
                    <Typography $variant="body1">
                      {updatedDate.toLocaleDateString()}
                    </Typography>
                  </InfoBox>
                </GridItem>
              </Grid>

              {event.notes && (
                <>
                  <Spacer $size="lg" />
                  <InfoBox $variant="warning">
                    <Typography $variant="h6" $color="warning">
                      📝 Notes
                    </Typography>
                    <Spacer $size="sm" />
                    <Typography $variant="body1">
                      {event.notes}
                    </Typography>
                  </InfoBox>
                </>
              )}
            </CardContent>
          </Card>
        </GridItem>
      </Grid>

      {/* Back Button */}
      <Spacer $size="xl" />
      <Flex $justify="center">
        <ActionButton onClick={() => window.history.back()}>
          ← Back to Calendar
        </ActionButton>
      </Flex>
    </PageContainer>
  )
}

export const Route = createFileRoute('/event/$eventId')({
  component: EventDetailPage,
}) 