# Use the official Node.js image as the base image
FROM node:22-alpine AS base

# Set the working directory
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install ts-node globally
RUN npm install -g ts-node

# Build the Next.js app
RUN npm run build

# Expose the port for the Express backend
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start:docker"]