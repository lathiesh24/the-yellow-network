# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.9.0

# Using a specific version of node with Alpine for smaller image size
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app

# Separating dependency installation to leverage Docker cache layering
FROM base as deps
COPY package.json package-lock.json ./
RUN npm install

# Final stage where the application is setup
FROM base as final

# Copy node_modules from the dependency installation stage
COPY --from=deps /usr/src/app/node_modules ./node_modules

# Copy your application code with the appropriate permissions
# COPY --chown=lenovo:lenovo . .
COPY . .

# Create necessary directories and set permissions specifically for .next/cache
# RUN mkdir -p .next/cache 
# RUN chown -R lenovo:lenovo .next

# Ensure the non-lenovo user 'node' can write to all necessary directories
# RUN chown -R lenovo:lenovo /usr/src/app

# Run the application as non-root user for security
# USER node

# Expose the port the application listens on
EXPOSE 3000

# Command to run the application, using `npm run dev` for development
CMD ["npm", "run", "dev"]
# CMD npm run dev
# Note: For production, consider changing CMD to ["npm", "start"] or to use a process manager like pm2
