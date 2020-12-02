import { Pool } from 'pg'

export default new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:cosc499postgres@localhost:5432/postgres',
  ssl: false,
  // ssl: {
  //   rejectUnauthorized: false, // so we can still use DB while connecting from localhost.
  // },
})
