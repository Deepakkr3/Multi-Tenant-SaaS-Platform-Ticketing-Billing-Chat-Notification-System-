FROM node:20.12.2

RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /axelglobe-microservice

# Copy package.json and package-lock.json (if exists) to the working directory
COPY package*.json ./
COPY axelglobe-*/package*.json axelglobe-*/package*.json ./ 

# Install dependencies
RUN pnpm install

# Copy the rest of the server application code
COPY . .

EXPOSE 9097

# Command to run the server
CMD ["sh", "-c", "pnpm start"]