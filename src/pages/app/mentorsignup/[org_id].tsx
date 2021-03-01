import Layout from '../../../components/layout'
import UserSignUp from '../../../components/UserSignUp'
import { getOrg, getAllOrgIds } from '../../../utils/org'

const MentorSignUp = ({ org_id, org_name }) => {
  return (
    <Layout>
      <UserSignUp 
        userType='mentor'
        org_id={org_id}
        org_name={org_name}
      />
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await getAllOrgIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const org = await getOrg(params.org_id)
  return {
    props: {
      org_id: org.id,
      org_name: org.org_name
    }
  }
}

export default MentorSignUp
