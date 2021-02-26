// Based on https://github.com/vercel/next.js/blob/canary/examples/with-firebase-authentication/pages/index.js
import { useUser } from '../../lib/auth/useUser'
import Layout from '../../components/layout'
import Profile from '../../components/Profile'
import Button from '@material-ui/core/Button'


const LoggedIn = () => {
  const { user, logout } = useUser()
  return (
    <Layout title="User Info">
      {user ? (
        <>
          <h4>Signed in successfully!</h4>
          <p>-Details-</p>
          <Profile id={user.uid}/>
          <p>Email Verified: {user.emailVerified ? 'true' : 'false'}</p>
          <Button variant='contained' onClick={() => {logout()}}>Logout</Button>
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