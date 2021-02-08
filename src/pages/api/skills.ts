import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'
import qs from 'qs'

export default async function skills(req: NextApiRequest, res: NextApiResponse) {
  // we will be responding with JSON in this file, declare this.
  res.setHeader('Content-Type', 'application/json')

  const token = await getToken()
  const query = qs.stringify({ q: req.query.filter, fields: 'name', limit: 1000 })
  const url = 'https://emsiservices.com/skills/versions/latest/skills?' + query
  const options = {
    method: 'GET',
    headers: { authorization: 'Bearer ' + token },
  }
  await fetch(url, options)
    .then((response) => response.json())
    .then(async (response) => {
      await safeSend({ res, data: JSON.stringify(response.data) })
    })
    .catch(async (error) => {
      await safeSend({ res, status: 400, data: JSON.stringify({ error: error.toString() }) })
    })
}

const getToken = async () => {
  let token = null
  const url = 'https://auth.emsicloud.com/connect/token'
  const params = new URLSearchParams({
    client_id: 'uocv0jx28sw2r99f',
    client_secret: 'XeVmKper',
    grant_type: 'client_credentials',
    scope: 'emsi_open',
  })
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: params,
  }
  await fetch(url, options)
    .then((response) => response.json())
    .then((response) => {
      token = response.access_token
    })
    .catch((error) => {
      console.log(error.response.data.error)
    })
  return token
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
