import Layout from '../../components/layout'
import UserSignUp from '../../components/UserSignUp'
import { getOrg, getAllOrgIds } from '../../utils/org'

const MentorSignUp = ({ org_id, org_name, mentor_email }) => {
  return (
    <Layout>
      <UserSignUp 
        userType='mentor'
        org_id={org_id}
        org_name={org_name}
        mentor_email={mentor_email}
      />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  console.log(context.query)
  const org = await getOrg(context.query.org_id)
  return {
    props: {
      org_id: org.id,
      org_name: org.org_name,
      mentor_email: context.query.recipient
    }
  }
}

export default MentorSignUp
