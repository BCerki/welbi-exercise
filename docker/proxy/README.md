# Nginx Reverse Proxy Setup

This directory contains a complete reverse proxy setup using Nginx and Docker Compose for routing traffic to your frontend and GraphQL backend services.

## Architecture

```
Internet → Nginx Proxy → Frontend (localhost:5173)
                      → GraphQL API (localhost:4000)
```

## Features

- ✅ **SSL/TLS Support** - Automatic HTTPS with self-signed certificates
- ✅ **Rate Limiting** - Protection against abuse (300 requests/second)
- ✅ **Version Routing** - Support for version-specific URLs
- ✅ **GraphQL Proxy** - Dedicated `/graphql` endpoint
- ✅ **Hot Module Replacement** - Dev server WebSocket support at `/hmr`
- ✅ **Security Headers** - CSP and X-Frame-Options protection
- ✅ **Health Checks** - Container health monitoring
- ✅ **Log Management** - Centralized nginx logs

## Quick Start

### 1. Start the Reverse Proxy

```bash
# Using the setup script (recommended)
./setup.sh start

# Or using docker-compose directly
docker-compose up -d
```

### 2. Access Your Services

- **Frontend**: https://localhost
- **GraphQL**: https://localhost/graphql
- **HMR (Dev)**: https://localhost/hmr

## Setup Script Usage

The `setup.sh` script provides convenient commands for managing the proxy:

```bash
./setup.sh start     # Start the reverse proxy
./setup.sh stop      # Stop the reverse proxy
./setup.sh restart   # Restart the reverse proxy
./setup.sh logs      # View nginx logs
./setup.sh status    # Check container status
./setup.sh setup     # Initial setup (SSL certificates)
```

## Configuration Details

### Upstream Services

The proxy expects these services to be running on your host:

- **Frontend**: `172.17.0.1:5173` (Vite dev server)
- **GraphQL**: `172.17.0.1:4000` (GraphQL API server)

### URL Routing

| URL Pattern | Target | Description |
|------------|--------|-------------|
| `/` | Frontend | Main application |
| `/graphql` | GraphQL API | API endpoint |
| `/hmr` | Frontend | Hot module replacement |
| `{version}.versions.*/*` | Frontend | Version-specific routing |
| `(release\|pr)-[a-zA-Z]+/*` | Frontend | Branch-specific routing |

### Rate Limiting

- **Zone**: `one` (10MB memory)
- **Rate**: 300 requests per second
- **Burst**: 5000 requests

### SSL Configuration

- **Protocols**: TLSv1.2, TLSv1.3
- **Certificates**: Self-signed (generated automatically)
- **Location**: `nginx/ssl/cert.pem` and `nginx/ssl/key.pem`

## File Structure

```
docker/proxy/
├── docker-compose.yml          # Docker Compose configuration
├── setup.sh                    # Management script
├── README.md                   # This documentation
└── nginx/
    ├── nginx.conf              # Main nginx configuration
    ├── conf.d/
    │   └── default.conf        # Proxy configuration
    ├── ssl/
    │   ├── generate.sh         # SSL certificate generator
    │   ├── cert.pem           # SSL certificate (generated)
    │   └── key.pem            # SSL private key (generated)
    └── mime.types             # MIME type definitions
```

## Customization

### Adding New Routes

Edit `nginx/conf.d/default.conf` and add new location blocks:

```nginx
location /api {
    proxy_pass http://your-api-service;
    proxy_set_header Host $http_host;
    # ... other proxy headers
}
```

### Changing Upstream Services

Modify the upstream blocks at the top of `nginx/conf.d/default.conf`:

```nginx
upstream your-service {
    server your-host:your-port;
}
```

### SSL Certificates

For production, replace the self-signed certificates with proper SSL certificates:

1. Place your certificates in `nginx/ssl/`
2. Update the paths in `nginx/conf.d/default.conf` if needed
3. Restart the proxy: `./setup.sh restart`

## Troubleshooting

### Common Issues

1. **SSL Certificate Errors**
   ```bash
   # Regenerate certificates
   cd nginx/ssl && ./generate.sh
   ./setup.sh restart
   ```

2. **Service Not Accessible**
   ```bash
   # Check if upstream services are running
   curl http://172.17.0.1:5173  # Frontend
   curl http://172.17.0.1:4000  # GraphQL
   ```

3. **Container Won't Start**
   ```bash
   # Check nginx configuration
   ./setup.sh status
   
   # View detailed logs
   ./setup.sh logs
   ```

### Debugging

- **View logs**: `./setup.sh logs`
- **Check status**: `./setup.sh status`
- **Test config**: `docker-compose exec nginx nginx -t`
- **Reload config**: `docker-compose exec nginx nginx -s reload`

## Security Considerations

- Self-signed certificates will show browser warnings
- Rate limiting is configured but may need adjustment for your use case
- Consider using a proper SSL certificate for production
- Review and adjust security headers as needed

## Production Deployment

For production deployment:

1. Replace self-signed certificates with proper SSL certificates
2. Update upstream server addresses
3. Adjust rate limiting rules
4. Configure proper logging and monitoring
5. Consider using a reverse proxy like Cloudflare in front of this setup

## Support

If you encounter issues:

1. Check the logs: `./setup.sh logs`
2. Verify your upstream services are running
3. Ensure ports 80 and 443 are not in use by other services
4. Check Docker and Docker Compose are properly installed 