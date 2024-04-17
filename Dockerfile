# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.9.0

FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app

FROM base as deps
COPY package.json package-lock.json ./
RUN npm install

FROM deps as build
COPY . .
RUN npm run build

FROM base as final

# Create necessary directories and set permissions
RUN mkdir -p /usr/src/app/.next/cache && \
    chown -R node:node /usr/src/app

# Run as non-root user
USER node

# Copy necessary files and set correct ownership
COPY --chown=node:node . .

# Expose the port the application listens on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "dev"]  # Consider changing to ["npm", "start"] for production environments
