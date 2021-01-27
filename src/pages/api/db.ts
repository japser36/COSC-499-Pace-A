import { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../lib/db'

export default (req: NextApiRequest, res: NextApiResponse) => {
  // we will be responding with JSON in this file, declare this.
  res.setHeader('Content-Type', 'application/json')

  pool
    .connect()
    .then((client) => {
      let reqData = null
      let reqType = null

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

      reqType = reqData.reqType
      switch (reqType) {
        case 'addUser': {
          addUser(client, res, reqData)
          break
        }
        case 'getUser': {
          getUser(client, res, reqData)
          break
        }
        case 'addMentorship': {
          addMentorship(client, res, reqData)
          break
        }
        case 'getMentors': {
          getMentors(client, res, reqData)
          break
        }
        case 'getOrgMentees': {
          getOrgMentees(client, res, reqData)
          break
        }
        case 'getOrgMentors': {
          getOrgMentors(client, res, reqData)
          break
        }
        default: {
          safeSend({ res, data: JSON.stringify({ success: false, error: 'no request type provided' }) })
          break
        }
      }

      //safeSend({ res, data: JSON.stringify({ success: true, received: reqData })})
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

//add a new user to 'users' table and respective userType table
const addUser = (client, res, reqData) => {
  if (reqData.displayName == '') reqData.displayName = reqData.firstName + ' ' + reqData.lastName
  let sql = `INSERT INTO users (id, firstName, lastName, displayName, email, userType)
    VALUES ($1, $2, $3, $4, $5, $6);`
  let values = [reqData.id, reqData.firstName, reqData.lastName, reqData.displayName, reqData.email, reqData.userType]
  //insert into the user table
  client.query(sql, values, (error, result) => {
    if (error) {
      safeSend({ res, status: 400, data: JSON.stringify({ error: error.toString() }) })
    } else {
      const rows = result ? result.rows : null
      //insert into either mentee, mentor, or admin depending on userType provided
      switch (reqData.userType) {
        case 'mentee': {
          sql = 'INSERT INTO mentee (id, admn_id, skills, timezone) VALUES ($1, $2, $3, $4);'
          values = [reqData.id, reqData.admn_id, reqData.skills, reqData.timezone]
          break
        }
        case 'mentor': {
          sql = 'INSERT INTO mentor (id, admn_id, skills, timezone) VALUES ($1, $2, $3, $4);'
          values = [reqData.id, reqData.admn_id, reqData.skills, reqData.timezone]
          break
        }
        case 'admin': {
          sql = 'INSERT INTO administrator (id, org_name) VALUES ($1, $2);'
          values = [reqData.id, reqData.org_name]
          break
        }
      }
      client.query(sql, values, (error, result) => {
        if (error) {
          safeSend({ res, status: 400, data: JSON.stringify({ error: error.toString() }) })
        } else {
          rows.concat(result ? result.rows : null)
          safeSend({ res, data: JSON.stringify({ success: true, rows }) })
        }
      })
    }
  })
}

//return a users information from their id
const getUser = (client, res, reqData) => {
  let sql = ''
  switch (reqData.userType) {
    case 'mentee': {
      sql = `SELECT *
            FROM users, mentee
            WHERE users.id = $1 AND users.id = mentee.id;`
      break
    }
    case 'mentor': {
      sql = `SELECT *
            FROM users, mentor
            WHERE users.id = $1 AND users.id = mentor.id;`
      break
    }
    case 'admin': {
      sql = `SELECT *
            FROM users, administrator
            WHERE users.id = $1 AND users.id = administrator.id;`
      break
    }
  }
  const values = [reqData.id]
  client.query(sql, values, (error, result) => {
    if (error) {
      safeSend({ res, status: 400, data: JSON.stringify({ error: error.toString() }) })
    } else {
      const rows = result ? result.rows : null
      safeSend({ res, data: JSON.stringify({ success: true, rows }) })
    }
  })
}

//add a new mentor-mentee match
const addMentorship = (client, res, reqData) => {
  const sql = 'INSERT INTO mentorship (mentor_id, mentee_id) VALUES ($1, $2);'
  const values = [reqData.mentor_id, reqData.mentee_id]
  client.query(sql, values, (error, result) => {
    if (error) {
      safeSend({ res, status: 400, data: JSON.stringify({ error: error.toString() }) })
    } else {
      const rows = result ? result.rows : null
      safeSend({ res, data: JSON.stringify({ success: true, rows }) })
    }
  })
}

//return all mentors matched with a given mentee
const getMentors = (client, res, reqData) => {
  const sql = `SELECT id, displayName, email
              FROM mentorship, users
              WHERE mentorship.mentee_id = $1 AND mentorship.mentor_id = users.id`
  const values = [reqData.mentee_id]
  client.query(sql, values, (error, result) => {
    if (error) {
      safeSend({ res, status: 400, data: JSON.stringify({ error: error.toString() }) })
    } else {
      const rows = result ? result.rows : null
      safeSend({ res, data: JSON.stringify({ success: true, rows }) })
    }
  })
}

//return list of mentees under a single administrator from admins id
const getOrgMentees = (client, res, reqData) => {
  const sql = `SELECT id, displayName, email
              FROM users, mentee
              WHERE users.id = mentee.id AND mentee.admn_id = $1`
  const values = [reqData.id]
  client.query(sql, values, (error, result) => {
    if (error) {
      safeSend({ res, status: 400, data: JSON.stringify({ error: error.toString() }) })
    } else {
      const rows = result ? result.rows : null
      safeSend({ res, data: JSON.stringify({ success: true, rows }) })
    }
  })
}

//return list of mentors under a single administrator from admins id
const getOrgMentors = (client, res, reqData) => {
  const sql = `SELECT id, displayName, email
              FROM users, mentor
              WHERE users.id = mentor.id AND mentor.admn_id = $1`
  const values = [reqData.id]
  client.query(sql, values, (error, result) => {
    if (error) {
      safeSend({ res, status: 400, data: JSON.stringify({ error: error.toString() }) })
    } else {
      const rows = result ? result.rows : null
      safeSend({ res, data: JSON.stringify({ success: true, rows }) })
    }
  })
}
