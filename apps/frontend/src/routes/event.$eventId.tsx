import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
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
      currentUser {
        id
        name
        email
      }
      currentUserIsRegistered
      createdAt
      updatedAt
    }
  }
`)

const CancelEventRegistrationMutation = graphql(`
  mutation cancelEventRegistration($eventId: ID!) { 
  cancelEventRegistration(eventId: $eventId) {
    eventId
    userId
  }
}`)

const RegisterForEventMutation = graphql(`
  mutation registerForEvent($eventId: ID!) { 
  registerForEvent(eventId: $eventId) {
    eventId
    userId
  }
}`)

function EventDetailPage() {
  const { eventId } = Route.useParams()
  // Prep queryClient for use in optimistic updates
  const queryClient = useQueryClient()

  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [cancelSuccess, setCancelSuccess] = useState(false)

  
  const { data: eventData, isLoading, error } = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => execute(EventDetailQuery, { id: eventId }),
  })

  console.log('eventData',eventData)
  const registerMutation = useMutation({
    mutationKey: ['event', eventId],
    mutationFn: () => execute(RegisterForEventMutation, { eventId: eventId }),
    retry: false,
    scope: {
      id: `registration-${eventId}`, // Prevent concurrent Prevent concurrent registrations/cancellations for this event
    },
    onMutate: async () => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: ['event', eventId] })

      // Snapshot the previous value
      const previousEventData = queryClient.getQueryData(['event', eventId])

      // Optimistically update the cache
      queryClient.setQueryData(['event', eventId], (old: typeof eventData) => {
        if (!old?.event) return old
        return {
          ...old,
          event: {
            ...old.event,
            currentUserIsRegistered: true,
            currentParticipants: (old.event.currentParticipants || 0) + 1,
            availableSpots: Math.max(0,(old.event.availableSpots || 0) - 1)
          },
        }
      })

      // Return context with the previous value for rollback
      return { previousEventData }
    },
    onError: (_err, _variables, context) => {
      // Rollback to the previous value on error
      if (context?.previousEventData) {
        queryClient.setQueryData(['event', eventId], context.previousEventData)
      }
    },
    onSuccess: () => {
      setRegisterSuccess(true)
      // Clear success message after 3 seconds
      setTimeout(() => setRegisterSuccess(false), 3000)
      // Invalidate and refetch to ensure consistency with server
      queryClient.invalidateQueries({ queryKey: ['event', eventId] })
    },
  })

 const cancelMutation = useMutation({
    mutationKey: ['event', eventId],
    mutationFn: () => execute(CancelEventRegistrationMutation, { eventId: eventId }),
    retry: false,
    scope: {
      id: `registration-${eventId}`, // Prevent concurrent registrations/cancellations for this event
    },
    onMutate: async () => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: ['event', eventId] })

      // Snapshot the previous value
      const previousEventData = queryClient.getQueryData(['event', eventId])

      // Optimistically update the cache
      queryClient.setQueryData(['event', eventId], (old: typeof eventData) => {
        if (!old?.event) return old
        return {
          ...old,
          event: {
            ...old.event,
            currentUserIsRegistered: false,
            currentParticipants: Math.max(0, (old.event.currentParticipants || 0) - 1),
            availableSpots:  (old.event.availableSpots || 0) + 1 
           ,
          },
        }
      })

      // Return context with the previous value for rollback
      return { previousEventData }
    },
    onError: (_err, _variables, context) => {
      // Rollback to the previous value on error
      if (context?.previousEventData) {
        queryClient.setQueryData(['event', eventId], context.previousEventData)
      }
    },
    onSuccess: () => {
      setCancelSuccess(true)
      // Clear success message after 3 seconds
      setTimeout(() => setCancelSuccess(false), 3000)
      // Invalidate and refetch to ensure consistency with server
      queryClient.invalidateQueries({ queryKey: ['event', eventId] })
    },
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

const handleRegister = () => {
  // Clear any previous errors and success messages when retrying
  registerMutation.reset()
  setRegisterSuccess(false)
  registerMutation.mutate()
}

const handleCancel = () => {
  // Clear any previous errors and success messages when retrying
  cancelMutation.reset()
  setCancelSuccess(false)
  cancelMutation.mutate()
}

const currentUser = eventData?.event?.currentUser
const currentUserIsRegistered = eventData?.event?.currentUserIsRegistered || false
const isLoggedIn = !!currentUser

const { isPending: registrationLoading, error: registrationError } = registerMutation
const { isPending: cancellationLoading, error: cancellationError } = cancelMutation

const loadingMessage = "Loading..."

const registrationButton = registrationLoading ? loadingMessage : <ActionButton 
              $size="small" 
              $variant="secondary"
              onClick={handleRegister}
              disabled={event.availableSpots && event.availableSpots < 1 || currentUserIsRegistered }
            >
              Register
            </ActionButton>

const cancellationButton = cancellationLoading ? loadingMessage : <ActionButton 
              $size="small" 
              $variant="danger"
              onClick={handleCancel}
            >
              Cancel Registration
            </ActionButton>

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
              <Spacer $size="sm" />
{event.registrationRequired && (
            <>
            <Spacer $size="sm" />
            {isLoggedIn ? (
              <>
                Your registration status is: {currentUserIsRegistered ? 'Registered' : 'Not registered'}
                <Spacer $size="sm" />
                {currentUserIsRegistered ? cancellationButton : registrationButton }
              </>
            ) : (
              <Typography $variant="body2" $color="muted">
                Please log in to register for this event
              </Typography>
            )}
            <Spacer $size="sm" />
            {registerSuccess && (
              <Typography $variant="body2" $color="success">
                ✅ Successfully registered for this event!
              </Typography>
            )}
            {cancelSuccess && (
              <Typography $variant="body2" $color="success">
                ✅ Successfully cancelled your registration!
              </Typography>
            )}
            {(registrationError || cancellationError) && (
              <Typography $variant="body2" $color="error">
                {registrationError?.message || cancellationError?.message}
              </Typography>
            )}
            </>
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