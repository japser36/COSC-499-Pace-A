import fetch from 'node-fetch'

const fetcher = (url) => fetch(url).then((res) => res.json())

const acceptPendingMatch = async (mentee_id, mentor_id) => {
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

export { fetcher, acceptPendingMatch }
