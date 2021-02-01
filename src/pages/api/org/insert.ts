import { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../../lib/db'

export default async function addOrg(req: NextApiRequest, res: NextApiResponse) {
  // we will be responding with JSON in this file, declare this.
  res.setHeader('Content-Type', 'application/json')

  const sql = `INSERT INTO org (id, org_name, email)
              VALUES ($1, $2, $3);`
  const values = [req.body.id, req.body.org_name, req.body.email]

  pool.query(sql, values, (error, result) => {
    if (error) {
      safeSend({ res, status: 400, data: JSON.stringify({ error: error.toString() }) })
    } else {
      const rows = result ? result.rows : null
      safeSend({ res, data: JSON.stringify({ success: true, rows }) })
    }
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
