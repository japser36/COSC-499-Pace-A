import { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../../lib/db'

export default async function addUser(req: NextApiRequest, res: NextApiResponse) {
  // we will be responding with JSON in this file, declare this.
  res.setHeader('Content-Type', 'application/json')

  const sql = `INSERT INTO users (id, firstName, lastName, displayName, email, skills, timezone, org_id, userType)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`
  const values = [
    req.body.id,
    req.body.firstName,
    req.body.lastName,
    req.body.displayName,
    req.body.email,
    req.body.skills,
    req.body.timezone,
    req.body.org_id,
    req.body.userType,
  ]

  await pool
    .query(sql, values)
    .then(async (result) => {
      const rows = result ? result.rows : null
      await safeSend({ res, data: JSON.stringify({ success: true, rows }) })
    })
    .catch(async (error) => {
      await safeSend({ res, status: 400, data: JSON.stringify({ error: error.toString() }) })
    })
}

const safeSend = async ({
  res,
  status = 200,
  data = null,
}: {
  res: NextApiResponse
  status?: number
  data: string
}) => {
  console.log(`Sending Response [${status}]:`, data)
  if (res.headersSent) {
    console.warn('Stopped a response since the response was already sent!')
  } else {
    res.status(status).send(data)
  }
}
