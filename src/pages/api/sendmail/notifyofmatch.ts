import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import { getUser } from '../../../utils/api'
import { server } from '../../../config'

export default async function NotifyOfMatch(req: NextApiRequest, res: NextApiResponse) {
  // we will be responding with JSON in this file, declare this.
  res.setHeader('Content-Type', 'application/json')

  const mentee = await getUser(req.body.mentee_id)
  const mentor = await getUser(req.body.mentor_id)

  const link = `${server}/app/login`

  const emailBody = `<h3>You've been matched with a new mentee. Review their details and decide if you want to mentor them.</h3>
  <p>Mentee: ${mentee.displayname}</p>
  <p>About: ${mentee.bio}</p>
  <p>Desired Skills: ${parseSkills(mentee.skills)}</p>
  <p>Timezone: ${JSON.parse(mentee.timezone).label}</p>
  <br></br>
  <p><a href=${link}>Click here to login to mentor.io</a></p>`
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mentor.io.noreply@gmail.com',
      pass: 'ngzywsvmlusapjoz',
    },
  })

  const mailOptions = {
    from: 'mentor.io.noreply@gmail.com',
    to: mentor.email,
    subject: 'A mentee has matched with you!',
    html: emailBody,
  }

  await transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      await safeSend({ res, status: 400, data: JSON.stringify({ error: error.toString() }) })
    } else {
      await safeSend({ res, data: JSON.stringify({ success: true, info }) })
    }
  })
}

const parseSkills = (skills) => {
  let out = ''
  skills = JSON.parse(skills)
  skills.forEach((skill) => {
    out = out.concat(skill.name, ', ')
  })
  return out
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
