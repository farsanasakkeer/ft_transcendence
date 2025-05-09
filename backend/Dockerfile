# Stage 1: Build
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install system dependencies required for SQLite and Prisma
RUN apk add --no-cache python3 make g++ sqlite openssl

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --force

# Copy the rest of the application
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Stage 2: Runtime
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache sqlite openssl

# Copy only the necessary files from the build stage
COPY --from=builder /app /app

# Use a non-root user for better security
RUN adduser -D appuser
USER appuser

# Expose the application port
EXPOSE 3000

# Apply migrations automatically when the container starts and run the app
CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]
