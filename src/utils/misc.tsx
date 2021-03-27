import { server } from '../config'

export const redirectToLogin = (context) => {
  const { res } = context
  res.writeHead(301, { location: `${server}/app/login` })
  res.end()
}

export const parseSkills = (skills) => {
  const parsedskills = []
  JSON.parse(skills).forEach((skill) => {
    parsedskills.push(skill.name)
  })
  return parsedskills
}
