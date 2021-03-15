import PendingMatches from '../../../components/UserDisplays/PendingMatches'
import { getUserType, getPendingMatches } from '../../../utils/api'
import Layout from '../../../components/layout'
import nookies from 'nookies'
import { firebaseAdmin } from '../../../lib/auth/firebaseAdmin'
import { redirectToLogin } from '../../../utils/misc'

const Pending = (props) => {
  const auth = props.auth
  const usertype = props.usertype
  const pendingmatches = JSON.parse(props.pendingmatches)
  return (
    <Layout title='Pending Matches' auth={auth} usertype={usertype}>
      {pendingmatches ? 
      <PendingMatches pendingmatches={pendingmatches} />
      : <>TODO: display something when mentor has no pending matches</>
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
    const pendingmatches = await getPendingMatches(uid)

    return {
      props: { 
        auth: true,
        usertype: usertype,
        pendingmatches: JSON.stringify(pendingmatches)
      },
    };
  } catch (error) {
    console.log(error)
    redirectToLogin(context)
    return {
      props: {
        auth: false
      },
    };
  }
};

export default Pending
