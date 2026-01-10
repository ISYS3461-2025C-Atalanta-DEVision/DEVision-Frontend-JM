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

# Build arguments for environment variables (passed at build time)
# On Render: Set these in the dashboard under Environment
ARG VITE_API_URL
ARG VITE_STRIPE_PUBLISHABLE_KEY

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

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Render uses PORT environment variable (defaults to 10000)
# We'll use envsubst to dynamically set the port
ENV PORT=80

# Create nginx config template that uses $PORT
RUN echo 'server { \
    listen ${PORT}; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    gzip on; \
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml; \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    location /health { \
        return 200 "healthy"; \
        add_header Content-Type text/plain; \
    } \
}' > /etc/nginx/templates/default.conf.template

# Expose the port (Render will use PORT env var)
EXPOSE ${PORT}

# Start nginx with envsubst for dynamic port
CMD sh -c "envsubst '\$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
