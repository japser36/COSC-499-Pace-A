import { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../../lib/db'

export default async function getOrg(req: NextApiRequest, res: NextApiResponse) {
  // we will be responding with JSON in this file, declare this.
  res.setHeader('Content-Type', 'application/json')

  const sql = `SELECT * FROM org WHERE org.id = $1;`
  const values = [req.query.id]

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
  //console.log(`Sending Response [${status}]:`, data)
  if (res.headersSent) {
    console.warn('Stopped a response since the response was already sent!')
  } else {
    res.status(status).send(data)
  }
}
