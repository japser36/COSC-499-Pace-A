import fetch from 'node-fetch'

export async function matchMentors(mentee_id) {
  const matched = []
  const mentee = await getMentee(mentee_id)
  const mentors = await getMentors(mentee.org_id)
  //console.log(mentee)
  mentors.forEach((mentor) => {
    mentor.scommon = numCommonSkills(mentee, mentor)
    mentor.tdiff = timezoneDiff(mentee, mentor)
    const h = heuristic(mentor.scommon, mentor.tdiff)
    if (h >= 1) matched.push(mentor)
    //console.log(mentor)
  })
  console.log(matched)
  return matched
}

//Returns the attributes of the mentee with the given id
async function getMentee(mentee_id) {
  let mentee
  await fetch('../api/user/' + mentee_id, { method: 'GET' })
    .then((res) => res.json())
    .then((res) => (mentee = res.rows[0]))
    .catch((error) => {
      console.log('error: ' + error)
    })
  return mentee
}

//Returns a list of mentors (with attributes id, skills, timezone) that share the given org_id.
async function getMentors(org_id) {
  const mentor_ids = []
  await fetch('../api/org/users/' + org_id, { method: 'GET' })
    .then((res) => res.json())
    .then((res) => {
      const users = res.rows
      users.forEach((user, index) => {
        if (user.usertype === 'mentor') {
          const mentor = { id: user.id, skills: user.skills, timezone: user.timezone }
          mentor_ids.push(mentor)
        }
      })
    })
    .catch((error) => {
      console.log('error: ' + error)
    })
  return mentor_ids
}

//Returns a count of skills shared between s1 and s2
function numCommonSkills(mentee, mentor) {
  let count = 0
  const mentee_skills = JSON.parse(mentee.skills)
  const mentor_skills = JSON.parse(mentor.skills)

  for (let i = 0; i < mentee_skills.length; i++) {
    for (let j = 0; j < mentor_skills.length; j++) {
      if (mentee_skills[i].name === mentor_skills[j].name) {
        count++
      }
    }
  }

  return count
}

//Returns the difference in timezones
function timezoneDiff(mentee, mentor) {
  return Math.abs(mentee.timezone - mentor.timezone)
}

//Returns a heuristic value based on number of common skills and timezone difference
function heuristic(scommon, tdiff) {
  return scommon - tdiff / 4
}
