import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import { server } from '../../../config'

export default async function NotifyOfMatch(req: NextApiRequest, res: NextApiResponse) {
  // we will be responding with JSON in this file, declare this.
  res.setHeader('Content-Type', 'application/json')

    let mentee
    await fetch(`${server}/api/user/${req.body.mentee_id}`, {method: 'GET'})
        .then((res) => res.json())
        .then((res) => (mentee = res.rows[0]))
    let mentor
    await fetch(`${server}/api/user/${req.body.mentor_id}`, {method: 'GET'})
        .then((res) => res.json())
        .then((res) => (mentor = res.rows[0]))

  const emailBody = `<h3>A new mentee has matched with you. Review their details and decide if you want to mentor them.</h3>
  <p>Mentee: ${mentee.displayname}</p>
  <p>Skills: ${mentee.skills}</p>
  <p>Timezone: ${mentee.timezone}`
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mentor.io.noreply@gmail.com',
      pass: 'cosc499pacea'
    }
  })

  const mailOptions = {
    from: 'mentor.io.noreply@gmail.com',
    to: mentor.email,
    subject: 'A mentee has matched with you!',
    html: emailBody
  }

  await transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      await safeSend({res, status: 400, data: JSON.stringify({ error: error.toString() })})
    } else {
      await safeSend({ res, data: JSON.stringify({ success: true, info }) })
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
