import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createSchema, createSchemaSDL } from './schema/index';
import { createContext } from './context';
import { parseDatabaseConfig, parseServerConfig, isDevelopment } from '@testwelbi/env-parser';
import fs from 'fs';

async function startServer() {
  // Parse configuration
  const dbConfig = parseDatabaseConfig();
  const serverConfig = parseServerConfig();
  const isDev = isDevelopment();

  // Create Express app
  const app = express();

  // Security middleware
  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        imgSrc: ["'self'", "data:", "apollo-studio-landing-page.cdn.apollographql.com"],
        scriptSrc: ["'self'", "https://embeddable-sandbox.cdn.apollographql.com"],
        manifestSrc: ["'self'", "apollo-studio-landing-page.cdn.apollographql.com"],
        frameSrc: ["'self'", "https://sandbox.embed.apollographql.com"],
      },
    },
  }));

  // CORS
  app.use(cors(serverConfig.cors));

  // Logging
  if (isDev) {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined'));
  }

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Create GraphQL schema
  const schema = createSchema();
  if (isDev) {
    fs.writeFileSync('schema.json', JSON.stringify(schema, null, 2));
    fs.writeFileSync('schema.graphql', createSchemaSDL());
  }

  // Create Apollo Server
  const server = new ApolloServer({
    schema,
    context: createContext,
    introspection: isDev,
    debug: isDev,
    plugins: [],
  });

  await server.start();

  // Apply GraphQL middleware
  server.applyMiddleware({ 
    app: app as any, 
    path: '/graphql',
    cors: false, // We already handle CORS above
  });

  // Start server
  const port = 4000; // Fixed port for GraphQL
  const host = serverConfig.host || '0.0.0.0';

  app.listen(port, host, () => {
    console.log(`🚀 Server ready at http://${host}:${port}${server.graphqlPath}`);
    console.log(`📊 GraphQL Playground: http://${host}:${port}${server.graphqlPath}`);
  });
}

// Start the server
startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
}); 