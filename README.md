# TestWelbi Monorepo

A monorepo built with **Rush** featuring a React frontend and GraphQL backend with all the requested libraries and technologies.

## ✅ Status: Ready for Development!

Rush monorepo is now operational with all projects successfully building. The dependency management, build orchestration, and workspace setup are working correctly.

## Quick Start

### Prerequisites
- Node.js >= 18.11.0
- Bun >= 1.0.0 (for running development servers)
- Rush (automatically installed)

**⚠️ Note**: During `rush update`, you may see peer dependency warnings for:
- `@tanstack/react-router` version mismatches
- `apollo-server-express` expecting Express ^4.17.1 vs 5.1.0

These warnings are expected and do not prevent the application from functioning properly.

### Setup & Development

```bash
# Install Rush globally (if not already installed)
npm install -g @microsoft/rush

# Install dependencies and build all projects
rush update
rush build

# Note: You may see warnings during build about "resize: can't open terminal" or Git repository state.
# These are non-blocking and do not affect the build success.

# Set up the database (required before starting servers)
DATABASE_URL=sqlite:./database.sqlite bun run libs/drizzle/src/migrate.ts
DATABASE_URL=sqlite:./database.sqlite bun run libs/seeds/src/index.ts

# Start reverse proxy for unified access (first-time setup)
cd docker/proxy && ./setup.sh setup    # Generate SSL certificates (run once)
cd docker/proxy && ./setup.sh start    # Access via https://localhost

# Note: When accessing HTTPS for the first time, your browser will show a security warning
# about the self-signed certificate. Click "Advanced" and "Proceed to localhost" to continue.

# Start development servers (run each in separate terminals)
cd apps/frontend && rushx dev    # Frontend on http://localhost:5173, but you should access it via https://localhost (on port 80 via the reverse proxy)
cd apps/graphql && rushx dev     # GraphQL on http://localhost:4000/graphql, but you should access it via https://localhost/graphql (on port 80 via the reverse proxy)
```

### Database Setup

The application uses SQLite for development with comprehensive seed data:

```bash
# Create database tables
DATABASE_URL=sqlite:./database.sqlite bun run libs/drizzle/src/migrate.ts

# Populate with sample data (100 events, users, locations, etc.)
DATABASE_URL=sqlite:./database.sqlite bun run libs/seeds/src/index.ts

# Alternative: Use the package scripts
cd libs/drizzle && DATABASE_URL=sqlite:../../database.sqlite bun run migrate
cd libs/seeds && DATABASE_URL=sqlite:../../database.sqlite bun run seed:dev
```

**Seed Data Includes:**
- 20 Users and sample roles/permissions
- 8 Wellness dimensions (Physical, Mental, Social, etc.)
- 15 Hobbies and activity categories
- 6 Locations (Activity Room, Art Studio, Fitness Center, etc.)
- 5 Facilitators with specialties
- 100+ Sample events with realistic scheduling
- Complete relationship mappings

### Rush Commands (Primary)

```bash
# Update dependencies
rush update

# Build all projects
rush build

# Build specific project and its dependencies
rush build --to @testwelbi/frontend
rush build --to @testwelbi/graphql

# Rebuild everything from scratch
rush rebuild

# Check version consistency
rush check
```

## Architecture

### Applications
- **@testwelbi/frontend** (`apps/frontend/`) - React app with TanStack Router, Boomer UI
- **@testwelbi/graphql** (`apps/graphql/`) - GraphQL server with Pothos, authorization, tracing

### Core Libraries
- **@testwelbi/types** - Shared TypeScript interfaces
- **@testwelbi/env-parser** - Zod-based environment validation
- **@testwelbi/time** - Date/time utilities with timezone support
- **@testwelbi/math** - Mathematical functions and calculations
- **@testwelbi/permissions** - CASL-based authorization system
- **@testwelbi/drizzle** - Database schema with Drizzle ORM
- **@testwelbi/ui** - UI component library
- **@testwelbi/graphql-schema** - Generated GraphQL schema
- **@testwelbi/query-client** - TanStack Query + GraphQL client
- **@testwelbi/seeds** - Database seeding utilities
- **@testwelbi/locales** - i18next internationalization
- **@testwelbi/tracking** - Analytics utilities

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **TanStack Router** for routing
- **TanStack Query** for data fetching
- **Boomer UI** for components
- **Vite** for development and building

### Backend
- **GraphQL** via Pothos (code-first)
- **Apollo Server** with Express
- **Authorization** via CASL integration
- **Drizzle ORM** for database schema
- **Relay pagination** support
- **Subgraph** capabilities
- **Tracing** with OpenTelemetry
- **Zod validation** for inputs

### Development
- **Rush** for monorepo management
- **TypeScript** throughout
- **PNPM** workspaces
- **Docker Compose** for development environment
- **Nginx** reverse proxy for unified access

## Development Workflow

### 1. Using Rush (Preferred)

Rush provides excellent dependency management and build orchestration:

```bash
# Install/update dependencies
rush update

# Build dependencies in correct order
rush build

# Watch mode for development
rush build:watch

# Run specific commands
rush test:ci
rush lint-fix
```

### 2. Environment Setup

You can run the services individually or use the unified reverse proxy:

**Individual Development Servers:**
- **Frontend**: http://localhost:5173 (or next available port if 5173 is in use)
- **GraphQL**: http://localhost:4000/graphql

**Unified Access via Reverse Proxy (Recommended):**
- **Frontend**: https://localhost/
- **GraphQL**: https://localhost/graphql

**Note**: Your browser will show a security warning for the self-signed certificate on first access. Accept the warning to proceed.

**Benefits of Using the Reverse Proxy:**
- ✅ Single entry point for all services
- ✅ SSL/HTTPS support with self-signed certificates
- ✅ No CORS issues between frontend and GraphQL
- ✅ Hot module replacement (HMR) support
- ✅ Rate limiting and security headers
- ✅ Production-like environment for development

### 3. Project Structure

```
apps/
├── frontend/          # React application
└── graphql/           # GraphQL server

libs/
├── types/             # Shared TypeScript types
├── env-parser/        # Environment validation
├── time/              # Date/time utilities
├── math/              # Mathematical functions
├── permissions/       # Authorization system
├── drizzle/           # Database schema
├── ui/                # UI components
├── graphql-schema/    # Generated GraphQL schema
├── query-client/      # GraphQL client
├── seeds/             # Database seeding
├── locales/           # Internationalization
└── tracking/          # Analytics

common/
└── config/rush/       # Rush configuration
```

## Next Steps

1. **Database Setup**: Configure PostgreSQL connection (currently using SQLite)
2. **Environment Variables**: Set up proper environment configuration files
3. **Authentication**: Implement user authentication flow
4. **Testing**: Add comprehensive test suites
5. **CI/CD**: Set up GitHub Actions or similar
6. **Deployment**: Configure production deployment with Docker

## Commands Reference

### Package Management
```bash
rush update            # Update dependencies
rush check             # Check version consistency
```

### Database
```bash
# Setup database (run once)
DATABASE_URL=sqlite:./database.sqlite bun run libs/drizzle/src/migrate.ts
DATABASE_URL=sqlite:./database.sqlite bun run libs/seeds/src/index.ts

# Reset database (clear and reseed)
rm database.sqlite && DATABASE_URL=sqlite:./database.sqlite bun run libs/drizzle/src/migrate.ts && DATABASE_URL=sqlite:./database.sqlite bun run libs/seeds/src/index.ts
```

### Development
```bash
# Option 1: Individual servers
cd apps/frontend && bun run dev    # Start frontend server
cd apps/graphql && bun run dev     # Start GraphQL server

# Option 2: Unified proxy (recommended)
cd docker/proxy && ./setup.sh setup    # Generate SSL certificates (first time only)
cd docker/proxy && ./setup.sh start    # Start reverse proxy
# Note: Accept the self-signed certificate warning in your browser
# Then start your development servers as above
```

### Building
```bash
rush build                        # Build all projects
rush build --to @testwelbi/frontend  # Build frontend and dependencies
rush rebuild                      # Clean rebuild all projects
```

## Benefits of Rush Setup

1. **Dependency Management**: Ensures consistent package versions across all projects
2. **Build Orchestration**: Builds projects in correct dependency order
3. **Incremental Builds**: Only rebuilds what's changed (when Git is available)
4. **Workspace Management**: Proper isolation and linking of packages
5. **Phantom Dependencies Protection**: Prevents accidental dependencies
6. **Enterprise Scale**: Battle-tested for large teams and codebases

The monorepo is now ready for development with professional-grade tooling and architecture! 