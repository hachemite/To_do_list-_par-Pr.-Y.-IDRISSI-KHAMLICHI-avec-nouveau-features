# STAGE 1: Build
FROM node:22-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
# 'npm ci' is faster and more reliable than 'npm install' for CI/Docker environments
RUN npm ci

# Copy source code and build
COPY . .
# Build for production
RUN npm run build --prod

# STAGE 2: Serve
FROM nginx:alpine

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built Angular files from the previous stage
# Note: Based on Angular 17+ and your angular.json, the output is in /browser
COPY --from=build /app/dist/frontend-angular/browser /usr/share/nginx/html

EXPOSE 80
