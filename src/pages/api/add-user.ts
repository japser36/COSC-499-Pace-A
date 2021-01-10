import { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../lib/db'
import bcrypt from 'bcrypt'

export default (req: NextApiRequest, res: NextApiResponse) => {
  // we will be responding with JSON in this file, declare this.
  res.setHeader('Content-Type', 'application/json')

  pool
    .connect()
    .then((client) => {
      const reqData = req.body
      const sql =
        'INSERT INTO users (fb_uid, firstName, lastName, displayName, email, passHash, userType) VALUES ($1, $2, $3, $4, $5, $6, $7);'
      const values = [
        reqData.fb_uid,
        reqData.firstName,
        reqData.lastName,
        reqData.displayName,
        reqData.email,
        hashPass(reqData.password),
        reqData.userType,
      ]
      client.query(sql, values, (error, result) => {
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

//password hashing using 'bcrypt'
const hashPass = (password) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}
