// Based on https://github.com/vercel/next.js/blob/canary/examples/with-firebase-authentication/pages/index.js
import { useUser } from '../../lib/auth/useUser'
import Layout from '../../components/layout'
import Profile from '../../components/Profile/Profile'

const LoggedIn = () => {
  const { user, userType } = useUser()
  return (
    <Layout title="User Info">
      {user ? (
        <>
          <h4>Signed in successfully!</h4>
          <p>-Details-</p>
          <Profile id={user.uid} userType={userType} />
        </>
      ) : (
        <>
          <p>No user is signed in.</p>
        </>
      )}
    </Layout>
  )
}

export default LoggedIn
