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

The app depends on certain environment variables being set:
```
DB_HOST=<host for rethink (defaults to localhost)>
DB_PORT=<port for rethink (defaults to 28015)>
PW_SALT_ROUNDS=integer number of rounds bcrypt should use for hashing passwords
SESSION_SECRET="your secret here"
```

These can be set in an .env file in /api.