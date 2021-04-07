import Layout from '../../../components/layout'
import nookies from 'nookies'
import { firebaseAdmin } from '../../../lib/auth/firebaseAdmin'
import { getMenteesMentor, getUserType } from '../../../utils/api'
import UserCard from '../../../components/UserDisplays/UserCard'
import { Button, Typography } from '@material-ui/core'
import { matchMentors } from '../../../utils/matching'

const Mentor = (props) => {
  const auth = props.auth
  const usertype = props.usertype
  const mentor = JSON.parse(props.mentor)

  return (
    <Layout title="My Mentor" needsAuth auth={auth} usertype={usertype}>
      {mentor ? (
        <UserCard user={mentor} />
      ) : (
        <>
          <Typography>{`You don't have a mentor.`}</Typography>
          <Typography>{`If you have already tried to match with one you can either wait to be accepted or try to match again.`}</Typography>
          <Button
            onClick={() => {
              matchMentors(props.id)
            }}
          >{`Click here to match with a mentor.`}</Button>
        </>
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
    if (usertype !== 'mentee') throw 'Must be a mentee to see this page'
    const mentor = await getMenteesMentor(uid)

    return {
      props: {
        auth: true,
        id: uid,
        usertype: usertype,
        mentor: JSON.stringify(mentor),
      },
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        auth: false,
        id: null,
        usertype: null,
        mentor: null,
      },
    }
  }
}

export default Mentor
