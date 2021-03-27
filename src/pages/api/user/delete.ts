import { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../../lib/db'
import { firebaseAdmin } from '../../../lib/auth/firebaseAdmin'

export default async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  // we will be responding with JSON in this file, declare this.
  res.setHeader('Content-Type', 'application/json')

  const sql = `DELETE FROM users WHERE id=$1;`
  const values = [req.body.id]

  firebaseAdmin
    .auth()
    .deleteUser(req.body.id)
    .then(async () => {
      await pool
        .query(sql, values)
        .then(async (result) => {
          const rows = result ? result.rows : null
          await safeSend({ res, data: JSON.stringify({ success: true, rows }) })
        })
    })
    .then(async () => {
      await pool
        .query('DELETE FROM metauser WHERE id=$1', values)
        .then(async (result) => {
          const rows = result ? result.rows : null
          await safeSend({ res, data: JSON.stringify({ success: true, rows }) })
      })
    })
    .then(async () => {
      await pool
        .query('UPDATE users SET mentor_id = null WHERE mentor_id = $1', values)
        .then(async (result) => {
          const rows = result ? result.rows : null
          await safeSend({ res, data: JSON.stringify({ success: true, rows }) })
      })
    })
    .then(async () => {
      await pool
        .query('DELETE FROM pendingmatches WHERE mentee_id=$1 OR mentor_id=$1;', values)
        .then(async (result) => {
          const rows = result ? result.rows : null
          await safeSend({ res, data: JSON.stringify({ success: true, rows }) })
      })
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
