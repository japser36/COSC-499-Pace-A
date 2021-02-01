import { Pool } from 'pg'

const connectionString = 'postgresql://postgres:cosc499postgres@localhost:5432/postgres'
if (process.env.NODE_ENV === 'test') connectionString = 'postgresql://postgres:cosc499postgres@localhost:5432/testing'
export default new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionString: process.env.DATABASE_URL || connectionString,
  ssl: false,
  // ssl: {
  //   rejectUnauthorized: false, // so we can still use DB while connecting from localhost.
  // },
})
