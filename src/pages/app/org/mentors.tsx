import MentorInvite from '../../../components/Inputs/MentorInvite'
import UserList from '../../../components/UserDisplays/UserList'
import { getUserType, getOrgMentors } from '../../../utils/api'
import Layout from '../../../components/layout'
import Typography from '@material-ui/core/Typography'
import nookies from 'nookies'
import { firebaseAdmin } from '../../../lib/auth/firebaseAdmin'

const Mentors = (props) => {
  const auth = props.auth
  const usertype = props.usertype
  const org_id = props.org_id
  const mentors = JSON.parse(props.mentors)

  return (
    <Layout title="Mentor Invite" needsAuth auth={auth} usertype={usertype}>
      <Typography variant="h5">Invite a new Mentor</Typography>
      <MentorInvite org_id={org_id} />
      {mentors ? (
        <>
          <Typography variant="h5">Current Mentors</Typography>
          <UserList users={mentors} subheader="email" deletable />
        </>
      ) : (
        <>
          <Typography variant="h5">{`There are currently no mentors associated with your organization.`}</Typography>
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
    if (usertype !== 'org') throw 'Must be an organization to see this page'
    const mentors = await getOrgMentors(uid)

    return {
      props: {
        auth: true,
        usertype: usertype,
        org_id: uid,
        mentors: JSON.stringify(mentors),
      },
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        auth: false,
        usertype: null,
        org_id: null,
        mentors: null,
      },
    }
  }
}

export default Mentors
