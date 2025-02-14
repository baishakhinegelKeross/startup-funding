FROM node:20.16.0

# Install build tools
RUN apt-get update && apt-get install -y build-essential python3 && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install --force

# Bundle app source
COPY . .

# Set environment variable for development
ENV NODE_ENV=development

# Set environment variable (ensure your app uses this)
ENV PORT=3000

# Expose the port (Docker doesn't interpret variables here)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
