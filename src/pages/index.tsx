import Link from 'next/link'
import { useUser } from '../lib/auth/useUser'
import Layout from '../components/layout'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button'

const Home = () => {
  const { user, logout } = useUser()
  const [userType, setUserType] = useState('default')
  const router = useRouter()
  return (
    <Layout home>
      <p>{user ? 'You are signed in.' : 'You can sign in or sign up below.'}</p> <br></br>
      <>
        {user ? (
          <>
            <br></br>
            <Link href="/app/loggedin">
              <a>View User Information</a>
            </Link>
            <br></br>
            <Link href="/">
              <a onClick={() => logout()}>Sign Out</a>
            </Link>
            <br></br>
          </>
        ) : (
          <div>
            <br></br>
            <Button
              variant="contained"
              onClick={() => {
                router.push('/app/login')
              }}
            >
              Sign In
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              variant="contained"
              onClick={() => {
                router.push('/app/register')
              }}
            >
              Sign Up
            </Button>
            <br></br>
            <br></br>
          </div>
        )}
      </>
    </Layout>
  )
}

export default Home
