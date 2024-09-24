# Step 1: Build the React app using a Node image
FROM node:alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN npm run build

# Step 2: Serve the built app using an nginx server
FROM nginx:1.23-alpine

# Remove the default nginx configuration file
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from the previous stage to the nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port on which nginx will run
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
