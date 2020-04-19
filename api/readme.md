# Findr API

This runs the API server for the Findr backend.

## Database

Findr uses a RethinkDB database because it's a document database and it has easy-to-use changefeeds for getting data to users in real-time. You can find install instructions [here](https://rethinkdb.com/docs/install/).

## Setup

To set up the database, make sure your .env file is pointing where you want:

```
DB_HOST=<host (localhost for local dev)>
DB_PORT=28015
```

and run:

```
npm run setup:db
```

This will _delete_ the current `findr` database if there already is one and all the data in it! Then it will create the `findr` database and all the needed tables.

The app depends on certain environment variables being set:

```
DB_HOST=<host for rethink (defaults to localhost)>
DB_PORT=<port for rethink (defaults to 28015)>
PW_SALT_ROUNDS=integer number of rounds bcrypt should use for hashing passwords
SESSION_SECRET="your secret here"
```

These can be set in an .env file in /api.

## Running

Once you have Rethink running and the tables setup, run:

```
npm run dev
```

to start a server that will restart on changes.
