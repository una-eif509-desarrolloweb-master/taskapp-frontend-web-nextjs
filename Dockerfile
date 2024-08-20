# Use the latest Node.js LTS version as the base image
FROM node:20-alpine
LABEL authors="maikol.guzman.alan@una.cr"

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port that the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]