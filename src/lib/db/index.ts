import { Pool } from 'pg'

let connectionString = 'postgresql://postgres:cosc499postgres@localhost:5432/postgres'
if (process.env.NODE_ENV === 'test') connectionString = 'postgresql://postgres:cosc499postgres@localhost:5432/testing'
export default new Pool({
  idleTimeoutMillis: 30000,
  connectionString: process.env.DATABASE_URL || connectionString,
  ssl: process.env.DATABASE_URL ? {
    rejectUnauthorized: false,
  } : false,
})
