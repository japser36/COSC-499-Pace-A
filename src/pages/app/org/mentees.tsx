import UserList from '../../../components/UserDisplays/UserList'
import { Typography } from '@material-ui/core'
import { getUserType, getOrgMentees } from '../../../utils/api'
import IFrameCopy from '../../../components/Misc/IFrameCopy'
import Layout from '../../../components/layout'
import nookies from 'nookies'
import { firebaseAdmin } from '../../../lib/auth/firebaseAdmin'

const Mentees = (props) => {
  const auth = props.auth
  const usertype = props.usertype
  const org_id = props.org_id
  const mentees = JSON.parse(props.mentees)

  return (
    <Layout title="Mentees" needsAuth auth={auth} usertype={usertype}>
      {mentees && mentees.length > 0 ? (
        <UserList users={mentees} deletable />
      ) : (
        <>
          <Typography variant='h5'>{`There are currently no mentees associated with your organization.`}</Typography>
          <IFrameCopy org_id={org_id} />
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
    const mentees = await getOrgMentees(uid)

    return {
      props: {
        auth: true,
        usertype: usertype,
        org_id: uid,
        mentees: JSON.stringify(mentees),
      },
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        auth: false,
        usertype: null,
        org_id: null,
        mentees: null,
      },
    }
  }
}

export default Mentees
