import Profile from '../../components/Profile/Profile'
import Layout from '../../components/layout'
import nookies from 'nookies'
import { firebaseAdmin } from '../../lib/auth/firebaseAdmin'
import { getUserType, getUser, getOrg } from '../../utils/api'
import { redirectToLogin } from '../../utils/misc'

const LoggedIn = (props) => {
  const auth = props.auth
  const user = JSON.parse(props.user)
  const org = JSON.parse(props.org)
  const usertype = props.usertype

  return (
    <Layout title='Profile' auth={auth} usertype={usertype}>
      TODO: improve the profile page
        <>
          <h4>Signed in successfully!</h4>
          <p>-Details-</p>
          <Profile user={user} org={org} usertype={usertype} />
        </>
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
        usertype: usertype
      },
    };
  } catch (error) {
    console.log(error)
    redirectToLogin(context)
    return {
      props: {
        auth: false
      },
    };
  }
};

export default LoggedIn
