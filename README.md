# Tune

**Tune** is a simple, fully responsive, and functional web application built with modern web technologies. It provides basic CRUD functionality for managing music records and features the ability to filter music by genre, and search by artist, album, and title.

## Technologies

### Frontend

- React with Vite

### Backend

- Express.js (Node.js)
- NODE VERSION 20+

## Instructions

To run the application you can follow the following steps.

1. Clone this repository - `https://github.com/leuel-a/tune`
2. Frontend

    - `cd client`
    - `npm install`
    - set up env file, the env file needs where the backend instance is running with the `VITE_BACKEND_URL`
    - Run the application with `npm run dev`

3. Backend

    - `cd server`
    - You can use Docker or run it locally
    - To run it locally
        - `npm install`
        - `npm run dev`
    - To run it with docker
        1. Make sure to have Docker installed
        2. Run `docker pull leuela/tune-backend-api:0.0.6.RELEASE`
        3. Run `docker run -d -p --envFile <path-to-env-file> leuela/tune-backend-api:0.0.6.RELEASE`
            - Note: If you are planning to use a local mongodb server, change the host name to
                `host.docker.internal`. This is because Docker containers are isolated from the host machine,
                so you'll need to make sure that the MongoDB instance on your local machine is accessible to
                the Docker container. And also make sure to make the `NODE_ENV` to development NOT `production`

                Example:
                    - if your local mongodb instance is running on `http://localhost:27010`, when supplying the
                    url for docker use `http://host.docker.internal:27010`
    - example `.env` file might look like

        ```env
            PORT=5000
            NODE_ENV=production
            SALT_WORK_FACTOR=10
            ACCESS_TOKEN_TTL=15min
            REFRESH_TOKEN_TTL=15d
            JWT_SECRET=8e912ce8de70645fd83f7366a2553e4225a0cb1bf622a1e247b7347b6f7c9bb6
            SESSION_SECRET=3fcff82ec0e24f80bd92ec44e173f7741becec56a6be7a0f204112f3dba26960
            
            DATABASE_URL_LOCAL=mongodb://localhost:27017/tune
            # DATABASE_URL_LOCAL=mongodb://host.docker.internal:27017/tune # For docker setup
        ```

Feel free to clone the repository and explore the code. Contributions and feedback are welcome!
