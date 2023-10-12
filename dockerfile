# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies in the container
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . ./

# Specify the command to run when the container starts
CMD [ "npm", "start" ]
