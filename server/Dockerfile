FROM node:lts-iron

# this is where the application will live in
WORKDIR /app

# copy the package.json and package-lock.json to the /app directory
COPY package*.json .

# run the npm install command 
RUN npm install

# copy the rest of the files
COPY . .

# export the port 80
EXPOSE 80 

# run the application
CMD ["npm", "start"]