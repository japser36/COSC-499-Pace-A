import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import { server } from '../../../config'

export default async function InviteMentor(req: NextApiRequest, res: NextApiResponse) {
  // we will be responding with JSON in this file, declare this.
  res.setHeader('Content-Type', 'application/json')

  let org
  await fetch(`${server}/api/org/${req.body.org_id}`, { method: 'GET' })
    .then((res) => res.json())
    .then((res) => (org = res.rows[0]))

  const link = `${server}/app/mentor/register?org_id=${org.id}&email=${req.body.recipient}`

  const emailBody = `<p>You've been invited by ${org.org_name} to become a mentor with their organization.</p>
  <a href=${link}>Click here to accept and sign up today.</a>`
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mentor.io.noreply@gmail.com',
      pass: 'cosc499pacea',
    },
  })

  const mailOptions = {
    from: 'mentor.io.noreply@gmail.com',
    to: req.body.recipient,
    subject: 'Invitation to Become a Mentor',
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
