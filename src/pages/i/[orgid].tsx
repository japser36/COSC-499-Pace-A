import { useRouter } from 'next/router'
import { useState } from 'react'
import UserSignUp from '../../components/UserSignUp'

export default function Login(): JSX.Element {
  const router = useRouter()
  const { orgid } = router.query
  const [orgData, setOrgData] = useState(null)

  if (orgData == null) {
    //TODO: fetch organization data and set when it arrives

    return <p> Loading... </p>
  }

  return <UserSignUp userType="Mentee" org_id={orgid} />
}
