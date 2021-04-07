import MentorProfile from '../../../components/Profile/MentorProfile'
import Layout from '../../../components/layout'
import nookies from 'nookies'
import { firebaseAdmin } from '../../../lib/auth/firebaseAdmin'
import { getUserType, getUser, getOrg } from '../../../utils/api'

const MentorProfilePage = (props) => {
  const auth = props.auth
  const mentor = JSON.parse(props.mentor)
  const org = JSON.parse(props.org)
  const usertype = props.usertype

  return (
    <Layout title="Profile" needsAuth auth={auth} usertype={usertype}>
      <MentorProfile mentor={mentor} org={org} />
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context)
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
    const uid = token.uid
    const usertype = await getUserType(uid)
    const mentor = await getUser(uid)
    const org = await getOrg(mentor.org_id)

    return {
      props: {
        auth: true,
        mentor: JSON.stringify(mentor),
        org: JSON.stringify(org),
        usertype: usertype,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        auth: false,
        mentor: null,
        org: null,
        usertype: null,
      },
    }
  }
}

export default MentorProfilePage
