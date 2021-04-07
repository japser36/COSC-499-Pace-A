import OrgProfile from '../../../components/Profile/OrgProfile'
import Layout from '../../../components/layout'
import nookies from 'nookies'
import { firebaseAdmin } from '../../../lib/auth/firebaseAdmin'
import { getUserType, getOrg, getOrgMentees, getOrgMentors } from '../../../utils/api'

const OrgProfilePage = (props) => {
  const auth = props.auth
  const org = JSON.parse(props.org)
  const mentees = JSON.parse(props.mentees)
  const mentors = JSON.parse(props.mentors)
  const usertype = props.usertype

  return (
    <Layout title="Profile" needsAuth auth={auth} usertype={usertype}>
      <OrgProfile org={org} mentees={mentees} mentors={mentors} />
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context)
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
    const uid = token.uid
    const usertype = await getUserType(uid)
    const org = await getOrg(uid)
    const mentees = await getOrgMentees(org.id)
    const mentors = await getOrgMentors(org.id)

    return {
      props: {
        auth: true,
        org: JSON.stringify(org),
        mentees: JSON.stringify(mentees),
        mentors: JSON.stringify(mentors),
        usertype: usertype,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        auth: false,
        org: null,
        mentees: null,
        mentors: null,
        usertype: null,
      },
    }
  }
}

export default OrgProfilePage
