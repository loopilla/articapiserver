README.md

Welcome to the ARTIC APP.

# Preconditions
You need to have a host VM with docker and docker compose installed.
You also have to clone the application.


# Setup
After cloning the application, you can simply start the application with
``
docker compose up
``

This will start 3 containers:
 - mysql
 - adminer
 - articapp

As we need some default entries in the database, you also have to run the migration and the seeds.

For this you should run the following shell files from the cloned app root in a separate terminal:

``
./migrate.sh
``
And when finished:
``
./seed.sh
``

# Adminer
With the running adminer, you will have a web gui to check on the database.

Open a new tab in you browser with the http://localhost:8080 and fill the parameters with the .env file's variables respectivly.


Warning! The application stores the data inside the running container, so each time you restart the container the stored data will be lost.
The reason is, I did not want to make trash on the host machine. Of course in a real application you should store the database in a persistent volume and the data file is stored on the host machine.


#Environment variables
For easier setup, I have added the environment file (.env) to the source control as this project is private, but of course this is not admissible in production.



# Testing
The tests can be run with in a separate terminal:
``
./test.sh
``

This going to run the tests apart from the app in an independent thread. So for tests you don't need to have a running application. Tried to mock a lot, but ...

I have attached a Postman collection file:
  ArticAPI.postman_collection.json

If you import it into Postman you can run the requests.

First signin, this will results a token: Bearer ....
You should set this token into the collection's token variable, because all guarded endpoint is refering to it in the request header/authorization property.

# Notes
 - As the artworks are not stored on the app side.
 - Yeah, I have ran into problem to mock the objection's QueryBuilder<..> class for testing, so I will work it out.
