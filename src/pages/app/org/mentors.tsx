import MentorInvite from '../../../components/Misc/MentorInvite'
import PendingInvites from '../../../components/UserDisplays/PendingInvites'
import UserList from '../../../components/UserDisplays/UserList'
import { getUserType, getOrgMentors, getPendingInvites } from '../../../utils/api'
import Layout from '../../../components/layout'
import { Typography } from '@material-ui/core'
import nookies from 'nookies'
import { firebaseAdmin } from '../../../lib/auth/firebaseAdmin'

const Mentors = (props) => {
  const auth = props.auth
  const usertype = props.usertype
  const org_id = props.org_id
  const mentors = JSON.parse(props.mentors)
  const invites = JSON.parse(props.invites)

  return (
    <Layout title="Mentors" needsAuth auth={auth} usertype={usertype}>
      {mentors && mentors.length > 0 ? (
        <>
          <Typography variant="h5">Current Mentors</Typography>
          <UserList users={mentors} deletable />
        </>
      ) : (
        <>
          <Typography variant="h5">{`There are currently no mentors associated with your organization.`}</Typography>
        </>
      )}
      <MentorInvite org_id={org_id} />
      {() => {if (invites && invites.length > 0) return <PendingInvites invites={invites} />}}
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
    const invites = await getPendingInvites(uid)

    return {
      props: {
        auth: true,
        usertype: usertype,
        org_id: uid,
        mentors: JSON.stringify(mentors),
        invites: JSON.stringify(invites),
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
        invites: null,
      },
    }
  }
}

export default Mentors
