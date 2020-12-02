# Pace A database documentation

Last Updated: 2020-12-01 @ 8:30PM PST

This document contains information relating to technical aspects of the database.

The database is hosted on heroku. It is attached as a free addon from heroku, to the main `cosc-499-pace-a` heroku app.

## Connecting to the database

### On Remote

To connect to the database while the app is hosted on remote, the pool variable should automatically function. There should be no extra steps required.

### On localhost

To use a database on localhost, each dev must install postgres and connect to a local 'kind of copy' of the db. This way the database is seperate from production so that no data can be accidentally lost.

When installing postgres, when prompted, for the port leave it on the default, same with the superuser username and for the password use `cosc499postgres`

Please see: [https://devcenter.heroku.com/articles/heroku-postgresql#local-setup](https://devcenter.heroku.com/articles/heroku-postgresql#local-setup)

**NOTE** that on windows, you must manually update your PATH variable, or at least Jasper had to. If you install postgres under the folder `G:\PostgreSQL` for example, then add the entry `G:\PostgreSQL\bin` to your Path system variable.

The local setup also requires you to set the environment variable DATABASE_URL, to the value `postgres://$(whoami)`. Don't do this!!! Our application specifically checks if this variable is missing, then assumes it is localhost, and uses the url `postgresql://postgres:cosc499postgres@localhost:5432/postgres`, see `index.ts` in this directory (`src/lib/db`).

If the DATABASE_URL variable is set, then your local database should be connected to by the pool automatically.

## Using the database

Example below is based on [this documentation example](https://devcenter.heroku.com/articles/getting-started-with-nodejs#provision-a-database) and [this blog post](https://medium.com/nsoft/building-and-running-nodejs-typescript-postgresql-application-with-docker-3878240a2f73).

To use the database, simply use the exported 'pool' default variable:

```ts
// example based on:
// https://devcenter.heroku.com/articles/getting-started-with-nodejs#provision-a-database
// and:
// https://medium.com/nsoft/building-and-running-nodejs-typescript-postgresql-application-with-docker-3878240a2f73
import pool from 'src/lib/db'

// any and all DB related code should be strictly used server-side, ie NEVER in a component, always under the /api route OR in the server-side part of a component.
// please review this link: https://nextjs.org/learn/basics/data-fetching, and decide which type of data-fetching is best for your use case (pre-rendered/static, or at runtime)
// always also use a try catch around database stuff, just in case!
async function getSomething() {
  try {
    const client = await pool.connect()

    const sql = 'SELECT * FROM test'
    const result = await client.query(sql)

    const rows = result ? result.rows : null
    // now use rows in some way :) This is the returned result set. null if there were no matched rows, so we can just `if (rows) { /* do something */ }
  } catch (e) {
    // heads up, you won't see serverside generated console.log statements. Instead, return this error and as a dev log it, or for production show the user some error or something.
  }
}
```

Please review [the NextJS tutorial](https://nextjs.org/learn/basics/data-fetching) to see how to correctly interface with a database while in the context of a NextJS app.

### Direct connection

To directly query the database and view contents, you can use the pg viewer application installed with postgress to view locally, or use the psql command for the cli interface.

Alternatively you can connect to the _remote_ database directly for debugging and viewing contents without having to query and log in the application. You can do this by installing the heroku cli, (and I think jasper might have to add you to the heroku app?) sign in to your heroku account (so that it can connect to the right apps), then run the command:

```
heroku pg:psql --app cosc-499-pace-a
```

Since the same database is connected for both staging and not staging, either `cosc-499-pace-a` or `cosc-499-pace-a-staging` will work for the app and connect you to the remote database. See the last few steps of [the tutorial](https://devcenter.heroku.com/articles/getting-started-with-nodejs#provision-a-database) for an example, and for the documentation Jasper used to do this.

BTW, when connecting directly, enter a semi-colon (;) after each complete sql statement. Pressing enter without that will just allow a multi-line single command. Type `\q` then hit enter to quit.

As a mini demo and test, please see the [`pages/api/hello-add.ts`](/api/hello-add) and [`pages/api/hello-get`](/api/hello-get) files :)

Note that for the two endpoints above to work, you have to have done the local postgres setup and also you have to connect once locally using `psql --username postgres` (then password when prompted is `cosc499postgres`). When connected, run the command `CREATE TABLE hello (id SERIAL PRIMARY KEY, time TIMESTAMPTZ, value VARCHAR(255))` to create the table that this uses.
