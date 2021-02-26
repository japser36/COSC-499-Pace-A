import Link from 'next/link'
import { useUser } from '../lib/auth/useUser'
import Layout from '../components/layout'
import { useState } from 'react'

const Home = () => {
  const { user, logout } = useUser()
  const [userType, setUserType] = useState('default')
  return (
    <Layout home>
      <p>{user ? 'Signed in.' : 'Not Signed in.'}</p>
        <>
          {user ? (
            <>
            <Link href="/app/loggedin">
              <a>View User Information</a>
            </Link>
            <br></br>
            <Link href="/">
              <a onClick={() => logout()}>Sign Out</a>
            </Link>
            </>
          ) : (
            <div>
            <Link href="/app/login">
              <a>Sign In</a>
            </Link>
            </div>
          )}
        </>
    </Layout>
  )
}

export default Home