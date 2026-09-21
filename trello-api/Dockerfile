FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build babel code
RUN yarn build

# Expose port
EXPOSE 8017

# Start the server
CMD ["yarn", "start"]
