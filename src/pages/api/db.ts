import { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../lib/db'

console.log('here1')

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log('here2')
  // we will be responding with JSON in this file, declare this.
  res.setHeader('Content-Type', 'application/json')

  pool
    .connect()
    .then((client) => {
      let reqData = null

      switch (req.method) {
        case 'POST': {
          reqData = req.body //use request body for POST requests
          break
        }
        case 'GET': {
          reqData = req.query //use request query for GET requests
          break
        }
      }

      let query = null
      const reqType = reqData.reqType
      switch (reqType) {
        case 'addMentee': {
          query = addMentee(reqData)
          break
        }
        case 'addMentor': {
          query = addMentor(reqData)
          break
        }
        case 'addOrg': {
          query = addOrg(reqData)
          break
        }
        case 'getMentee': {
          query = getMentee(reqData)
          break
        }
        case 'getMentor': {
          query = getMentor(reqData)
          break
        }
        case 'getOrg': {
          query = getOrg(reqData)
          break
        }
        case 'getOrgMentees': {
          query = getOrgMentees(reqData)
          break
        }
        case 'getOrgMentors': {
          query = getOrgMentors(reqData)
          break
        }
        case 'setMentor': {
          query = setMentor(reqData)
          break
        }
        default: {
          safeSend({ res, data: JSON.stringify({ success: false, error: 'no request type provided' }) })
          break
        }
      }

      client.query(query.sql, query.values, (error, result) => {
        if (error) {
          safeSend({ res, status: 400, data: JSON.stringify({ error: error.toString() }) })
        } else {
          const rows = result ? result.rows : null
          safeSend({ res, data: JSON.stringify({ success: true, rows }) })
        }
      })

      safeSend({ res, data: JSON.stringify({ success: true, received: reqData }) })
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

const addMentee = (reqData) => {
  const sql = `INSERT INTO users (id, firstName, lastName, displayName, email, userType)
              VALUES ($1, $2, $3, $4, $5, 'mentee');
              INSERT INTO mentee (id, org_id, skills, timezone)
              VALUES ($1, $6, $7, $8);`
  const values = [
    reqData.id,
    reqData.firstName,
    reqData.lastName,
    reqData.displayName,
    reqData.email,
    reqData.org_id,
    reqData.skills,
    reqData.timezone,
  ]
  return {
    sql: sql,
    values: values,
  }
}

const addMentor = (reqData) => {
  const sql = `INSERT INTO users (id, firstName, lastName, displayName, email, userType)
              VALUES ($1, $2, $3, $4, $5, 'mentor');
              INSERT INTO mentor (id, org_id, skills, timezone)
              VALUES ($1, $6, $7, $8);`
  const values = [
    reqData.id,
    reqData.firstName,
    reqData.lastName,
    reqData.displayName,
    reqData.email,
    reqData.org_id,
    reqData.skills,
    reqData.timezone,
  ]
  return {
    sql: sql,
    values: values,
  }
}

const addOrg = (reqData) => {
  const sql = `INSERT INTO org (id, org_name, email)
              VALUES ($1, $2, $3);`
  const values = [reqData.id, reqData.org_name, reqData.email]
  return {
    sql: sql,
    values: values,
  }
}

//return a mentee from id
const getMentee = (reqData) => {
  const sql = `SELECT *
              FROM users, mentee
              WHERE users.id = $1 AND users.id = mentee.id;`
  const values = [reqData.id]
  return {
    sql: sql,
    values: values,
  }
}

//return a mentor from id
const getMentor = (reqData) => {
  const sql = `SELECT *
              FROM users, mentor
              WHERE users.id = $1 AND users.id = mentor.id;`
  const values = [reqData.id]
  return {
    sql: sql,
    values: values,
  }
}

//return an organization from id
const getOrg = (reqData) => {
  const sql = `SELECT *
              FROM org
              WHERE org.id = $1`
  const values = [reqData.id]
  return {
    sql: sql,
    values: values,
  }
}

//return list of mentees within an organization
const getOrgMentees = (reqData) => {
  const sql = `SELECT id, displayName, email
              FROM users, mentee
              WHERE users.id = mentee.id AND mentee.org_id = $1`
  const values = [reqData.id]
  return {
    sql: sql,
    values: values,
  }
}

//return list of mentors within an organization
const getOrgMentors = (reqData) => {
  const sql = `SELECT id, displayName, email
              FROM users, mentor
              WHERE users.id = mentor.id AND mentor.org_id = $1`
  const values = [reqData.id]
  return {
    sql: sql,
    values: values,
  }
}

//update a mentees mentor
const setMentor = (reqData) => {
  const sql = `UPDATE mentee
              SET mentor_id = $1
              WHERE id = $2`
  const values = [reqData.mentor_id, reqData.mentee_id]
  return {
    sql: sql,
    values: values,
  }
}

module.exports = setMentor
