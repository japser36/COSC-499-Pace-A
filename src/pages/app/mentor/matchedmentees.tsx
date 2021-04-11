import PendingMatches from '../../../components/UserDisplays/PendingMatches'
import Typography from '@material-ui/core/Typography'
import { getUserType, getPendingMatches } from '../../../utils/api'
import Layout from '../../../components/layout'
import nookies from 'nookies'
import { firebaseAdmin } from '../../../lib/auth/firebaseAdmin'

const MatchedMentees = (props) => {
  const auth = props.auth
  const usertype = props.usertype
  const pendingmatches = JSON.parse(props.pendingmatches)
  return (
    <Layout title="Matched Mentees" needsAuth auth={auth} usertype={usertype}>
      {pendingmatches && pendingmatches.length > 0 ? (
        <PendingMatches pendingmatches={pendingmatches} />
      ) : (
        <>
          <Typography>{`You don't have any matches right now`}</Typography>
          <Typography>{`Wait for a new mentee to be matched with you and they will appear here.`}</Typography>
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
    if (usertype !== 'mentor') throw 'Must be a mentor to see this page'
    const pendingmatches = await getPendingMatches(uid)

    return {
      props: {
        auth: true,
        usertype: usertype,
        pendingmatches: JSON.stringify(pendingmatches),
      },
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        auth: false,
        usertype: null,
        pendingmatches: null,
      },
    }
  }
}

export default MatchedMentees
