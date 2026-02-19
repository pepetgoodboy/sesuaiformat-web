# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files first to leverage cache
COPY package*.json ./

# Use npm ci for faster, reliable installs
RUN npm ci

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

# Clean default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy build artifacts
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx listens on port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
