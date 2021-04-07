import Profile from '../../components/Profile/Profile'
import Layout from '../../components/layout'
import NoAuthCard from '../../components/NoAuthCard'
import nookies from 'nookies'
import { firebaseAdmin } from '../../lib/auth/firebaseAdmin'
import { getUserType, getUser, getOrg } from '../../utils/api'

const ProfilePage = (props) => {
  const auth = props.auth
  console.log('Blah!', props)
  const user = JSON.parse(props.user)
  const org = JSON.parse(props.org)
  const usertype = props.usertype

  return (
<<<<<<< HEAD
    <Layout title="Profile" auth={auth} usertype={usertype}>
      TODO: improve the profile page
=======
    <Layout title='Profile' needsAuth auth={auth} usertype={usertype}>
>>>>>>> develop
      <Profile user={user} org={org} usertype={usertype} />
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context)
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
    const uid = token.uid
    const usertype = await getUserType(uid)
    const user = await getUser(uid)
    const org = await getOrg(uid)

    return {
      props: {
        auth: true,
        user: JSON.stringify(user),
        org: JSON.stringify(org),
        usertype: usertype,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        auth: false,
<<<<<<< HEAD
=======
        user: null,
        org: null,
        usertype: null
>>>>>>> develop
      },
    }
  }
}

export default ProfilePage
