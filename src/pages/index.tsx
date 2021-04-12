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
        <>
          {
            {
              org: (
                <>
                  <h1>{`Welcome to Mentor.io`}</h1>
                  <p>
                    {`As an organization you can invite mentors to register, enable mentee registration, view user
                    information, and delete users.`}
                  </p>
                  <p>{`Visit your profile to view and edit your details.`}</p>
                  <p>{`View mentees via the 'Mentees' tab.`}</p>
                  <p>{`View and invite mentors via the 'Mentors' tab.`}</p>
                </>
              ),
              mentor: (
                <>
                  <h1>{`Welcome to Mentor.io`}</h1>
                  <p>{`As a mentor you can accept or decline mentees and view your current mentees.`}</p>
                  <p>{`View pending mentee matches via the 'Matched Mentees' tab.`}</p>
                  <p>{`View your mentees via the 'My Mentees' tab.`}</p>
                  <p>{`Communication with mentees can be done via email.`}</p>
                </>
              ),
              mentee: (
                <>
                  <h1>{`Welcome to Mentor.io`}</h1>
                  <p>{`As a mentee you can view your mentors information.`}</p>
                  <p>{`View your mentor's information via the 'My Mentor' tab.`}</p>
                  <p>{`Communication with your mentor can be done via email.`}</p>
                </>
              ),
            }[usertype]
          }
        </>
      ) : (
        <div>
          <h1>{`Welcome to Mentor.io`}</h1>
          <p>{`If you have an account already log in above.`}</p>
          <p>{`To register as a mentor you must recieve an invitation from your organization.`}</p>
          <p>
            {`To register as a mentee go to your organizations website and find the embeded mentor.io registration page.`}
          </p>
          <p>{`To register an organization click the button below.`}</p>
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
