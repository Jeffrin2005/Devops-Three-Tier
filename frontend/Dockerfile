# frontend/Dockerfile
# ---- Stage 1: Build the React Code ----
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy frontend source code and build it (Vite/React)
COPY . .
RUN npm run build

# ---- Stage 2: Serve with Nginx ----
FROM nginx:alpine

# Copy the built React app to Nginx's web folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the frontend web server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
