import Head from 'next/head'
import SkillsForm from '../../components/SkillsForm'
const fetch = require('node-fetch')
const { URLSearchParams } = require('url')
import qs from 'qs'

export default function Shamus({ data }) {
  return (
    <>
      <Head>
        <title>Shamus Dev Page</title>
      </Head>
      <h1>Shamus Dev Page</h1>
    </>
  )
}

export const getStaticProps = async () => {
  const temp = { temp: 'hi' }
  const data = { skills: [] }
  let token = null
  await getToken().then((res) => {
    token = res
  })

  await getSkills(token).then((skills) => {
    for (const i in skills) {
      data.skills.push(skills[i].name)
    }
    //data = skills[0].name
  })

  console.log(data.skills)
  return {
    props: temp,
  }
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

const getSkills = async (token) => {
  let skills = {}
  const query = qs.stringify({ fields: 'name', limit: '5' })
  const url = 'https://emsiservices.com/skills/versions/latest/skills?' + query
  const options = {
    method: 'GET',
    headers: { authorization: 'Bearer ' + token },
  }
  await fetch(url, options)
    .then((response) => response.json())
    .then((response) => {
      skills = response.data
    })
    .catch((error) => {
      console.log(error.response.data.error)
    })
  return skills
}

//the following command is the only fix i could find for a recurring issue i have been having. I think this is an issue on my end only but idk for sure.
//yarn add @types/jest @types/node @types/react @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-react husky lint-staged prettier typescript jest ts-jest
