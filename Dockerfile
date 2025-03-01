FROM node:20.18.1-slim AS build

# Install OpenSSL for potential dependencies
RUN apt-get update && apt-get install -y openssl

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9.14.4

# Copy package.json and related files for dependency installation
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
# This COPY excludes the db directory
COPY astro.config.mjs ./
COPY nginx.conf ./
COPY src ./src
COPY public ./public
COPY starpod.config.ts ./
COPY tailwind.config.mjs ./
COPY tsconfig.json ./

# Build the Astro application
RUN pnpm build

# Production stage using NGINX to serve static files
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run NGINX
CMD ["nginx", "-g", "daemon off;"]
