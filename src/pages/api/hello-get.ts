import { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../lib/db'

export default (req: NextApiRequest, res: NextApiResponse) => {
  // we will be responding with JSON in this file, declare this.
  res.setHeader('Content-Type', 'application/json')

  pool
    .connect()
    .then((client) => {
      const reqData = req.body
      const sql = 'SELECT * FROM hello ORDER BY time DESC;'
      client.query(sql, (error, result) => {
        if (error) {
          safeSend({ res, status: 400, data: JSON.stringify({ error: error.toString() }) })
        } else {
          const rows = result ? result.rows : null

          safeSend({ res, data: JSON.stringify({ success: true, rows }) })
        }
      })

      // safeSend({ res, data: { success: true, received: reqData } })
      client.release()
    })
    .catch((error) => {
      safeSend({ res, status: 400, data: error })
    })
}

const safeSend = ({ res, status = 200, data = null }: { res: NextApiResponse; status?: number; data: string }) => {
  console.log(`Sending Response [${status}]:`, data)
  if (res.headersSent) {
    console.warn('Stopped a response since the response was already sent!')
  } else {
    res.status(status).send(data)
  }
}
