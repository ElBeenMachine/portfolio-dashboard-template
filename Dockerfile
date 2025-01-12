# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Create the database directory
RUN mkdir -p /app/data/db
RUN chmod 777 -R /app/data/db

# Initialise the database for the build
ENV NODE_ENV=production
ENV DOCKER_BUILD=true
RUN npm run init
ENV DOCKER_BUILD=false

# Build the Next.js application
RUN npx next build

# Delete the database file
RUN rm -rf /app/data/db/config.db

# Stage 2: Run the application
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy only the build output from the builder stage
COPY --from=builder /app ./

# Expose port 3000
EXPOSE 3000

# Set up the healthcheck
HEALTHCHECK --interval=30s --timeout=5s --retries=5 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/healthcheck || exit 1

# Start the Next.js application
CMD ["npm", "start"]