import { createFileRoute } from '@tanstack/react-router'
import { Typography, Box } from '@testwelbi/ui'

function AboutPage() {
  return (
    <Box>
      <Typography $variant="h2" $gutterBottom>
        About TestWelbi
      </Typography>
      
      <Typography $variant="body1">
        This is a modern monorepo setup using Rush for package management,
        with a React frontend and GraphQL backend.
      </Typography>

      <Typography $variant="h5" $gutterBottom>
        Architecture
      </Typography>
      
      <Typography $variant="body1">
        The application is built with a microservices architecture where
        the frontend and backend are separate services that communicate
        through a shared proxy.
      </Typography>
    </Box>
  )
}

export const Route = createFileRoute('/about')({
  component: AboutPage,
}) 