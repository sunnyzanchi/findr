# Scavenge API
This runs the API server for the Scavenge backend.

## Database
Scavenge uses a RethinkDB database because it's a document database and it has easy-to-use changefeeds for getting data to users in real-time.

### Setup
To set up the database, make sure your .env file is pointing where you want:
```
DB_HOST=<host (localhost for local dev)>
DB_PORT=28015
```

and run:
```
yarn setup:db
```
This will *delete* the current `scavenge` database if there already is one and all the data in it! Then it will create the `scavenge` database and all the needed tables.