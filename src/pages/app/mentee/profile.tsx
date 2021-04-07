import MenteeProfile from '../../../components/Profile/MenteeProfile'
import Layout from '../../../components/layout'
import nookies from 'nookies'
import { firebaseAdmin } from '../../../lib/auth/firebaseAdmin'
import { getUserType, getUser, getOrg } from '../../../utils/api'

const MenteeProfilePage = (props) => {
  const auth = props.auth
<<<<<<< HEAD:src/pages/app/profile.tsx
  console.log('Blah!', props)
  const user = JSON.parse(props.user)
=======
  const mentee = JSON.parse(props.mentee)
>>>>>>> develop:src/pages/app/mentee/profile.tsx
  const org = JSON.parse(props.org)
  const usertype = props.usertype

  return (
    <Layout title="Profile" needsAuth auth={auth} usertype={usertype}>
      <MenteeProfile mentee={mentee} org={org} />
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context)
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
    const uid = token.uid
    const usertype = await getUserType(uid)
    const mentee = await getUser(uid)
    const org = await getOrg(mentee.org_id)

    return {
      props: {
        auth: true,
        mentee: JSON.stringify(mentee),
        org: JSON.stringify(org),
        usertype: usertype,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        auth: false,
        mentee: null,
        org: null,
        usertype: null,
      },
    }
  }
}

export default MenteeProfilePage
