# Products rack visit App

Basic Products App example of distributed systems using PostgreSQL & Redis Database.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

After cloning the repository, execute the command

```
npm install
```

In each of the server folders to download node dependencies. And pull the required Docker images for this example, the used images were:

* [PostgreSQL](https://hub.docker.com/_/postgres) - Relational Database to save products data
* [Node](https://hub.docker.com/_/node) (with :10 tag) - Javascript environment, for the server layer. Also used to create a container of each server, generating the distributed system of the example
* [Redis](https://hub.docker.com/_/redis) - Database to save products visits

## Deployment

### Images Server

With Docker running, in the server root folder execute the command

```
docker build -t images-server .
```

To create the image of the server, after that run

```
docker run -p 8000:8000 -d images-server
```

To create the server container and execute it; now the server is available in port [8000](http://0.0.0.0:8000), with its static resources located in the relative path /images

### API

With Docker running and required images installed, in the server root folder execute the command

```
docker-compose up --build
```

To build & run our Docker Compose file, now in another terminal tab write the following command

```
docker exec -it pg psql -U postgres -d postgres -f docker-entrypoint-initdb.d/init.sql 
```

This command executes psql from an sql file in case the script is not loaded automatically with the docker-compose command, so that the database is loaded with the products info, after that server services are working correctly.

The server must be located in port [8090](http://0.0.0.0:8090), redirecting to the information of the products in the route /products. On the other hand the PostgreSQL use the address: [0.0.0.0:5432](http://0.0.0.0:5432)

### Visits Server

With Docker running and required images installed, in the server root folder execute the command

```
docker-compose up --build
```
the server must be located in port [4001](http://0.0.0.0:4001), the services are in 
 in the routes /visits which requiere a json with the id of the image in the database and the route /clean to clean the cache memory
 
 ### UI
 
 With Docker running and required images installed, in the server root folder execute the command
 
 ```
 docker build -t client .
 ```

To create the image of the client, after that run

```
docker run -p 8080:80 -d client
```

Now the app is available in port [8080](http://0.0.0.0:8080)

## Authors

* **Alejandro Gonzalez** - *Initial work* - [AlejandroGonzalR](https://github.com/AlejandroGonzalR)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
