import UserList from '../../../components/UserDisplays/UserList'
import Typography from '@material-ui/core/Typography'
import { getUserType, getMentorsMentees } from '../../../utils/api'
import Layout from '../../../components/layout'
import nookies from 'nookies'
import { firebaseAdmin } from '../../../lib/auth/firebaseAdmin'

const MyMentees = (props) => {
  const auth = props.auth
  const usertype = props.usertype
  const mentees = JSON.parse(props.mentees)

  return (
    <Layout title="Mentees" needsAuth auth={auth} usertype={usertype}>
      {mentees ? <UserList users={mentees} subheader='email'/> 
      : <>
        <Typography >You dont have any mentees right now.</Typography>
        <Typography >You can accept new mentees that have matched with you on the 'matched mentees' page</Typography>
      </>
      }
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context)
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
    const uid = token.uid
    const usertype = await getUserType(uid)
    if (usertype !== 'mentor') throw 'Must be a mentor to see this page'
    const mentees = await getMentorsMentees(uid)

    return {
      props: {
        auth: true,
        usertype: usertype,
        mentees: JSON.stringify(mentees),
      },
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        auth: false,
        usertype: null,
        mentees: null,
      },
    }
  }
}

export default MyMentees
