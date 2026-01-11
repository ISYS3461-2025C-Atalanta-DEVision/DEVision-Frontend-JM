# =============================================================================
# DEVision Frontend - Multi-stage Docker Build
# =============================================================================
# Compatible with: Render, Docker, any container platform
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1: Build
# -----------------------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (for better layer caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --silent

# Copy source code
COPY . .

# Build arguments for environment variables
# Hardcode production defaults since Render doesn't pass build args easily
ARG VITE_API_URL=https://api-gateway-khhr.onrender.com
ARG VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51Sfc81EPPTtsttuBeP94ZJWPFbL2IDVSclymMZs1yQ5bbwbzO8UtVW3m5i0pfbZ5j5HM9COFGkL4Q2AvgD1gNrx8006UeBb2Sn

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_STRIPE_PUBLISHABLE_KEY=$VITE_STRIPE_PUBLISHABLE_KEY

# Build the application
RUN npm run build

# -----------------------------------------------------------------------------
# Stage 2: Production with Nginx
# -----------------------------------------------------------------------------
FROM nginx:alpine AS production

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Render uses PORT environment variable (defaults to 10000)
ENV PORT=80

# Create nginx config template directory and file
RUN mkdir -p /etc/nginx/templates

# Create nginx config template that uses $PORT
RUN printf 'server {\n\
    listen %s;\n\
    server_name localhost;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    gzip on;\n\
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml;\n\
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {\n\
        expires 1y;\n\
        add_header Cache-Control "public, immutable";\n\
    }\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
    location /health {\n\
        return 200 "healthy";\n\
        add_header Content-Type text/plain;\n\
    }\n\
}\n' '${PORT}' > /etc/nginx/templates/default.conf.template

# Expose the port
EXPOSE 80

# Start nginx with envsubst for dynamic port
CMD sh -c "envsubst '\$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
