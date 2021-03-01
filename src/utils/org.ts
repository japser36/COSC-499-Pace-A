import { server } from '../config'

export async function getAllOrgIds() {
  let orgs
  await fetch(`${server}/api/org/getall`, {method: 'GET'})
  .then((res) => res.json())
  .then((res) => (orgs = res.rows))

  return orgs.map(org => {
    return {
      params: {
        org_id: org.id
      }
    }
  })
}

export async function getOrg(id) {
    let org
    await fetch(`${server}/api/org/${id}`, {method: 'GET'})
    .then((res) => res.json())
    .then((res) => (org = res.rows[0]))
    return org
}