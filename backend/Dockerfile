# Use Node.js Alpine base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install system dependencies required for SQLite and Prisma
RUN apk add --no-cache python3 make g++ sqlite openssl

# Copy package.json first to leverage Docker caching
COPY package.json ./

# Install dependencies inside Docker
RUN npm install --force

# Copy the rest of the application
COPY . .

# Generate Prisma client (ensure migrations work inside Docker)
RUN npx prisma generate

# Apply migrations automatically when the container starts
CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]
