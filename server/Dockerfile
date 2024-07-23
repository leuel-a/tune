FROM node:lts-iron

# this is where the application will live in
WORKDIR /app

# copy all the files from the current directory to the container
COPY . /app

# run the npm install command 
RUN npm install

# export the port 3000
EXPOSE 3000

# run the application
CMD ["npm", "start"]