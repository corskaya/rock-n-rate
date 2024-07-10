# Use an official Node.js runtime as a parent image
FROM node:18-alpine3.17

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json /usr/src/app/

# Install app dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . /usr/src/app

# Expose a port to communicate with the React app
EXPOSE 3000

# Start your React app
CMD ["npm", "run", "dev"]