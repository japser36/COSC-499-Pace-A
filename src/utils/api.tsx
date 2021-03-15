import fetch from 'node-fetch'
import { server } from '../config'

export const fetcher = (url) => fetch(url).then((res) => res.json())

export const getMetaUser = async (id) => {
  let metauser = null
  await fetch(`${server}/api/metauser/${id}`, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => metauser = res.rows[0] ? res.rows[0] : null)
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
      .then((res) => user = res.rows[0] ? res.rows[0] : null)
  return user
}

export const getOrg = async (id) => {
  let org = null
  await fetch(`${server}/api/org/${id}`, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => org = res.rows[0] ? res.rows[0] : null )
  return org
}

export const getMentorsMentees = async (mentor_id) => {
  let mentees = null
  await fetch(`${server}/api/user/get-mentees/${mentor_id}`, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => mentees = res.rows)
  return mentees
}

export const getPendingMatches = async (mentor_id) => {
  let pendingmatches = null
  await fetch(`${server}/api/pendingmatches/${mentor_id}`, { method: 'GET' })
    .then((res) => res.json())
    .then((res) => pendingmatches = res.rows)
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

export const getOrgUsers =async (org_id) => {
  let users = null
  await fetch(`${server}/api/org/users/${org_id}`, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => users = res.rows)
  return users
}
