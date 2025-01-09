# Stage 1: Build the application
FROM node:19-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .
# Build the application (assuming you have a build script in package.json)
EXPOSE 5173

CMD npm run dev
