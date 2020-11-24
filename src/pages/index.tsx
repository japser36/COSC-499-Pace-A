import Link from 'next/link'
import { useUser } from '../lib/auth/useUser'
import Layout from '../components/layout'

export default function Home() {
  const { user, logout } = useUser()
  return (
    <Layout home>
      <p>{user ? 'Signed in.' : 'Not Signed in.'}</p>
      <h5>Mini Dev Menu:</h5>
      <ul>
        <li>
          <Link href="/app/calendar">
            <a>Check out the calendar now.</a>
          </Link>
        </li>
        <li>
          {user ? (
            <Link href="/">
              <a onClick={() => logout()}>Sign Out Test</a>
            </Link>
          ) : (
            <Link href="/app/login">
              <a>Sign In Test</a>
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  )
}
