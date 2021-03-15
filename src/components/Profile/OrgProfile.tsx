import useSWR from 'swr'
import { fetcher } from '../../utils/api'

const OrgProfile = ({ org }) => {
  return (
    <>
      <p>ID: {org.id}</p>
      <p>Email: {org.email}</p>
      <p>Organization Name: {org.org_name}</p>
    </>
  )
}

export default OrgProfile
