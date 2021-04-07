import Link from 'next/link'
import { Button } from '@material-ui/core'
import nookies from 'nookies'
import { firebaseAdmin } from '../lib/auth/firebaseAdmin'
import Layout from '../components/layout'
import { getUserType } from '../utils/api'

const Home = (props) => {
  const auth = props.auth
  const usertype = props.usertype

  return (
    <Layout title="Home" auth={auth} usertype={usertype}>
      {auth ? (
        <>TODO: show logged in home page</>
      ) : (
        <div>
          <h1>Welcome to Mentor.io</h1>
          <p>If you have an account already log in above, or sign up through your organization of choice.</p>
          <p>To sign up as an admin register your organization below.</p>
          <Link href={'/app/org/register'} passHref>
            <Button variant="outlined"> Register an Organization</Button>
          </Link>
          <p></p>
        </div>
      )}
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context)
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
    const uid = token.uid
    const usertype = await getUserType(uid)

    return {
      props: {
        auth: true,
        usertype: usertype,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        auth: false,
      },
    }
  }
}

export default Home
