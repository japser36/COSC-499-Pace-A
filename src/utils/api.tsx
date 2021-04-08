import fetch from 'node-fetch'
import { server } from '../config'

export const fetcher = (url) => fetch(url).then((res) => res.json())

export const getMetaUser = async (id) => {
  let metauser = null
  await fetch(`${server}/api/metauser/${id}`, { method: 'GET' })
    .then((res) => res.json())
    .then((res) => {
      metauser = res.rows[0] ? res.rows[0] : null
    })
  return metauser
}

export const getUserType = async (id) => {
  const metauser = await getMetaUser(id)
  const usertype = metauser ? metauser.usertype : null
  return usertype
}

export const getUser = async (id) => {
  let user = null
  await fetch(`${server}/api/user/${id}`, { method: 'GET' })
    .then((res) => res.json())
    .then((res) => {
      user = res.rows[0] ? res.rows[0] : null
    })
  return user
}

export const getOrg = async (id) => {
  let org = null
  await fetch(`${server}/api/org/${id}`, { method: 'GET' })
    .then((res) => res.json())
    .then((res) => {
      org = res.rows[0] ? res.rows[0] : null
    })
  return org
}

export const getMentorsMentees = async (mentor_id) => {
  let mentees = null
  await fetch(`${server}/api/user/get-mentees/${mentor_id}`, { method: 'GET' })
    .then((res) => res.json())
    .then((res) => {
      mentees = res.rows
    })
  return mentees
}

export const getPendingMatches = async (mentor_id) => {
  let pendingmatches = null
  await fetch(`${server}/api/pendingmatches/${mentor_id}`, { method: 'GET' })
    .then((res) => res.json())
    .then((res) => {
      pendingmatches = res.rows
    })
  return pendingmatches
}

export const acceptPendingMatch = async (mentee_id, mentor_id) => {
  await fetch(`/api/pendingmatches/delete`, {
    method: 'POST',
    body: JSON.stringify({
      mentee_id: mentee_id,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
  await fetch(`/api/user/set-mentor`, {
    method: 'POST',
    body: JSON.stringify({
      mentee_id: mentee_id,
      mentor_id: mentor_id,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
  await fetch(`/api/sendmail/notifyofaccept`, {
    method: 'POST',
    body: JSON.stringify({
      mentee_id: mentee_id,
      mentor_id: mentor_id,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
}

export const declinePendingMatch = async (mentee_id, mentor_id) => {
  await fetch(`/api/pendingmatches/deleterow`, {
    method: 'POST',
    body: JSON.stringify({
      mentee_id: mentee_id,
      mentor_id: mentor_id,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
}

export const getOrgUsers = async (org_id) => {
  let users = null
  await fetch(`${server}/api/org/users/${org_id}`, { method: 'GET' })
    .then((res) => res.json())
    .then((res) => {
      users = res.rows
    })
  return users
}

export const getOrgMentees = async (org_id) => {
  let mentees = null
  await fetch(`${server}/api/org/mentees/${org_id}`, { method: 'GET' })
    .then((res) => res.json())
    .then((res) => {
      mentees = res.rows
    })
  return mentees
}

export const getOrgMentors = async (org_id) => {
  let mentors = null
  await fetch(`${server}/api/org/mentors/${org_id}`, { method: 'GET' })
    .then((res) => res.json())
    .then((res) => {
      mentors = res.rows
    })
  return mentors
}

export const getMenteesMentor = async (mentee_id) => {
  const mentee = await getUser(mentee_id)
  const mentor = await getUser(mentee.mentor_id)
  return mentor
}

export const insertUser = async (
  id,
  firstName,
  lastName,
  displayName,
  email,
  timezone,
  skills,
  bio,
  org_id,
  usertype
) => {
  await fetch('/api/metauser/insert', {
    method: 'POST',
    body: JSON.stringify({
      id: id,
      usertype: usertype,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
  await fetch('/api/user/insert', {
    method: 'POST',
    body: JSON.stringify({
      id: id,
      firstName: firstName,
      lastName: lastName,
      displayName: displayName ? displayName : firstName + ' ' + lastName,
      email: email,
      timezone: JSON.stringify(timezone),
      skills: JSON.stringify(skills),
      bio: bio,
      org_id: org_id,
      usertype: usertype,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
}

export const insertOrg = async (id, org_name, email) => {
  await fetch('/api/metauser/insert', {
    method: 'POST',
    body: JSON.stringify({
      id: id,
      usertype: 'org',
    }),
    headers: { 'Content-Type': 'application/json' },
  })
  await fetch('/api/org/insert', {
    method: 'POST',
    body: JSON.stringify({
      id: id,
      org_name: org_name,
      email: email,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
}

export const deleteUser = async (id) => {
  await fetch(`/api/user/delete`, {
    method: 'POST',
    body: JSON.stringify({
      id: id,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
}

export const setOrgName = async (org_id, org_name) => {
  await fetch(`/api/org/set-name`, {
    method: 'POST',
    body: JSON.stringify({
      org_id: org_id,
      org_name: org_name,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
}

export const setUserDisplayName = async (id, displayname) => {
  await fetch(`/api/user/set-displayname`, {
    method: 'POST',
    body: JSON.stringify({
      id: id,
      displayname: displayname,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
}

export const setUserBio = async (id, bio) => {
  await fetch(`/api/user/set-bio`, {
    method: 'POST',
    body: JSON.stringify({
      id: id,
      bio: bio,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
}

export const setUserCalendar = async (id, calendar) => {
  await fetch(`/api/user/set-calendar`, {
    method: 'POST',
    body: JSON.stringify({
      id: id,
      calendar: calendar,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
}
