import UserSignUp from '../../../components/SignIn/UserSignUp'
import { server } from '../../../config'

const MentorSignUp = ({ org_id, org_name, mentor_email }) => {
  return <UserSignUp userType="mentor" org_id={org_id} org_name={org_name} mentor_email={mentor_email} />
}

export async function getServerSideProps(context) {
  let org
  await fetch(`${server}/api/org/${context.query.org_id}`, { method: 'GET' })
    .then((res) => res.json())
    .then((res) => (org = res.rows[0]))
  return {
    props: {
      org_id: org.id,
      org_name: org.org_name,
      mentor_email: context.query.email,
    },
  }
}

export default MentorSignUp
