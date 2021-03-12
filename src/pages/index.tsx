import Link from 'next/link'
import { useUser } from '../lib/auth/useUser'
import Layout from '../components/layout'
import { Button } from '@material-ui/core'

const Home = () => {
  const { user } = useUser()
  return (
    <Layout home>
      {user ? (
        <>
          //TODO: show logged in home page
        </>
      ) : (
        <div>
          //TODO: show loggedout home page
          <Link href={'/app/org/register'} passHref>
            <Button>Register an Organization</Button>
          </Link>
        </div>
      )}
    </Layout>
  )
}

export default Home
