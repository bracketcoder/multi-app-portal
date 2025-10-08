# Multi-App Portal Docker Configuration
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json files for root and all apps
COPY package*.json ./
COPY app-1/package*.json ./app-1/
COPY app-2/package*.json ./app-2/
COPY app-3/package*.json ./app-3/

# Install dependencies for all apps
RUN npm ci --only=production && \
    cd app-1 && npm ci --only=production && \
    cd ../app-2 && npm ci --only=production && \
    cd ../app-3 && npm ci --only=production && \
    cd ..

# Copy source code
COPY . .

# Build all applications
RUN npm run build

# Expose port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the unified server
CMD ["node", "unified-server.js"]