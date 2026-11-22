# Multi-stage Dockerfile for Luna Handmade Backend
# Stage 1: Build TypeScript
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json tsconfig.json ./

# Install all dependencies (including devDependencies for building)
RUN npm ci

# Copy source code
COPY src/ ./src/

# Compile TypeScript to JavaScript (dist/)
RUN npm run build

# Stage 2: Production Runner
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy production manifests and install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy compiled code from builder
COPY --from=builder /app/dist ./dist

# Create persistent data and uploads directories
RUN mkdir -p data uploads

# Expose backend port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/api/health || exit 1

# Start production server
CMD ["node", "dist/server.js"]
