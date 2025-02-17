# Use the official Node.js image as the base
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and install dependencies
COPY backend/package.json backend/package-lock.json ./
RUN npm install

# Copy the backend code into the container
COPY backend/ .

# Expose the Fastify server port
EXPOSE 3000

# Start the Fastify server
CMD ["node", "server.js"]