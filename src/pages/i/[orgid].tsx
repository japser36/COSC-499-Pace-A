import { useRouter } from 'next/router'

import UserSignUp from '../../components/UserSignUp'

export default function Login(): JSX.Element {
  const router = useRouter()
  const { orgid } = router.query

  return <UserSignUp userType="Mentee" org_id={orgid} />
}
