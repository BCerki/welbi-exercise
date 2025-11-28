import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Heading, AppBar, Toolbar, Container, Flex } from '@testwelbi/ui'
import { DevAuthWidget } from '../components'

export const Route = createRootRoute({
  component: () => (
    <>
      <AppBar $position="static">
        <Toolbar $gap="md" $justify="between">
          <Flex $align="center" $gap="md">
            <Heading $variant="h6" $noMargin>TestWelbi</Heading>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </Flex>
          <DevAuthWidget />
        </Toolbar>
      </AppBar>
      <Container $maxWidth="lg" $sx="mt-4">
        <Outlet />
      </Container>
      <TanStackRouterDevtools />
    </>
  ),
}) 