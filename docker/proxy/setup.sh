#!/bin/bash

# Reverse Proxy Setup Script
set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔧 Reverse Proxy Setup Script${NC}"
echo "================================"

# Function to display usage
usage() {
    echo "Usage: $0 {start|stop|restart|logs|status|setup}"
    echo ""
    echo "Commands:"
    echo "  start    - Start the reverse proxy"
    echo "  stop     - Stop the reverse proxy"
    echo "  restart  - Restart the reverse proxy"
    echo "  logs     - Show nginx logs"
    echo "  status   - Show container status"
    echo "  setup    - Initial setup (generate SSL certs if missing)"
    exit 1
}

# Function to check if SSL certificates exist
check_ssl() {
    if [[ ! -f "nginx/ssl/cert.pem" || ! -f "nginx/ssl/key.pem" ]]; then
        echo -e "${YELLOW}⚠️  SSL certificates not found. Generating...${NC}"
        cd nginx/ssl
        chmod +x generate.sh
        ./generate.sh
        cd ../..
        echo -e "${GREEN}✅ SSL certificates generated${NC}"
    else
        echo -e "${GREEN}✅ SSL certificates found${NC}"
    fi
}

# Function to start the proxy
start_proxy() {
    echo -e "${GREEN}🚀 Starting reverse proxy...${NC}"
    check_ssl
    docker-compose up -d
    echo -e "${GREEN}✅ Reverse proxy started${NC}"
    echo -e "${YELLOW}📝 Access your services at:${NC}"
    echo "   • HTTP:  http://localhost"
    echo "   • HTTPS: https://localhost"
    echo "   • GraphQL: https://localhost/graphql"
}

# Function to stop the proxy
stop_proxy() {
    echo -e "${YELLOW}🛑 Stopping reverse proxy...${NC}"
    docker-compose down
    echo -e "${GREEN}✅ Reverse proxy stopped${NC}"
}

# Function to restart the proxy
restart_proxy() {
    echo -e "${YELLOW}🔄 Restarting reverse proxy...${NC}"
    docker-compose down
    docker-compose up -d
    echo -e "${GREEN}✅ Reverse proxy restarted${NC}"
}

# Function to show logs
show_logs() {
    echo -e "${GREEN}📋 Showing nginx logs...${NC}"
    docker-compose logs -f nginx
}

# Function to show status
show_status() {
    echo -e "${GREEN}📊 Container Status:${NC}"
    docker-compose ps
    echo ""
    echo -e "${GREEN}🔍 Health Check:${NC}"
    docker-compose exec nginx nginx -t 2>/dev/null && echo -e "${GREEN}✅ Nginx configuration is valid${NC}" || echo -e "${RED}❌ Nginx configuration has errors${NC}"
}

# Function for initial setup
initial_setup() {
    echo -e "${GREEN}🔧 Running initial setup...${NC}"
    check_ssl
    echo -e "${GREEN}✅ Setup complete! You can now run: $0 start${NC}"
}

# Main script logic
case "${1}" in
    start)
        start_proxy
        ;;
    stop)
        stop_proxy
        ;;
    restart)
        restart_proxy
        ;;
    logs)
        show_logs
        ;;
    status)
        show_status
        ;;
    setup)
        initial_setup
        ;;
    *)
        usage
        ;;
esac 