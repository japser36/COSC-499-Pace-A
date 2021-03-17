import UserSignUp from '../../../components/SignIn/UserSignUp'
import Layout from '../../../components/layout'
import { getOrg } from '../../../utils/api'

const MentorSignUp = (props) => {
  const org = JSON.parse(props.org)
  const mentor_email = props.mentor_email

  return (
    <Layout title='Register Mentor' auth={false} >
      <UserSignUp userType="mentor" org_id={org.org_id} org_name={org.org_name} mentor_email={mentor_email} />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const org = await getOrg(context.query.org_id)
  return {
    props: {
      org: JSON.stringify(org),
      mentor_email: context.query.email,
    },
  }
}

export default MentorSignUp
