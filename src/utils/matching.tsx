import fetch from 'node-fetch'

export async function matchMentors(mentee_id) {
  const matched = []
  const mentee = await getMentee(mentee_id)
  const mentors = await getMentors(mentee.org_id)
  //console.log(mentee)
  mentors.forEach((mentor) => {
    const scommon = commonSkills(mentee, mentor)
    mentor.scommon = scommon.length
    mentor.tdiff = timezoneDiff(mentee, mentor)
    const h = heuristic(mentor.scommon, mentor.tdiff)
    if (h >= 1) matched.push({mentor: mentor, skills: scommon})
  })
  console.log(matched)
  matched.forEach(async (match) => {
    await fetch('/api/pendingmatches/insert', {
      method: 'POST',
      body: JSON.stringify({
        mentee_id: mentee_id,
        mentor_id: match.mentor.id,
        skills: JSON.stringify(match.skills),
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    await fetch('/api/sendmail/notifyofmatch', {
      method: 'POST',
      body: JSON.stringify({
        mentee_id: mentee_id,
        mentor_id: match.mentor.id,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
  })
  return matched
}

//Returns the attributes of the mentee with the given id
async function getMentee(mentee_id) {
  let mentee
  await fetch(`/api/user/${mentee_id}`, { method: 'GET' })
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
  await fetch(`/api/org/users/${org_id}`, { method: 'GET' })
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
function commonSkills(mentee, mentor) {
  let skills = []
  const mentee_skills = JSON.parse(mentee.skills)
  const mentor_skills = JSON.parse(mentor.skills)

  if (mentee_skills && mentor_skills) {
    for (let i = 0; i < mentee_skills.length; i++) {
      for (let j = 0; j < mentor_skills.length; j++) {
        if (mentee_skills[i].name === mentor_skills[j].name) {
          skills.push(mentee_skills[i])
        }
      }
    }
  }
  return skills
}

//Returns the difference in timezones
function timezoneDiff(mentee, mentor) {
  const mentee_timezone = JSON.parse(mentee.timezone)
  const mentor_timezone = JSON.parse(mentor.timezone)
  return Math.abs(mentee_timezone.value - mentor_timezone.value)
}

//Returns a heuristic value based on number of common skills and timezone difference
function heuristic(scommon, tdiff) {
  return scommon - tdiff / 4
}
