import { server } from '../config'

export const parseSkills = (skills) => {
  const parsedskills = []
  JSON.parse(skills).forEach((skill) => {
    parsedskills.push(skill.name)
  })
  return parsedskills
}

export const getIFrame = (org_id) => {
  return `<iframe src="${server}/i/${org_id}" title="Mentee Registration" height="600" width="800" />`
}
