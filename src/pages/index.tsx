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
    <Layout title='Home' auth={auth} usertype={usertype}>
      {auth ? (
        <>TODO: show logged in home page</>
      ) : (
        <div>
          TODO: show loggedout home page
          <Link href={'/app/org/register'} passHref>
            <Button>Register an Organization</Button>
          </Link>
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
        usertype: usertype
      },
    };
  } catch (error) {
    console.log(error)
    return {
      props: {
        auth: false
      },
    };
  }
};

export default Home
