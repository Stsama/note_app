FROM node:20-alpine

# create app directory
WORKDIR /app

# install app dependencies
COPY package*.json ./

# run npm install
RUN npm install

# bundle app source
COPY . .

# expose port 8080
EXPOSE 8080

# start the app
CMD ["npm", "start"]
