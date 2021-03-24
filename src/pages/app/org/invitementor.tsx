import MentorInvite from '../../../components/Inputs/MentorInvite'
import { getUserType } from '../../../utils/api'
import Layout from '../../../components/layout'
import nookies from 'nookies'
import { firebaseAdmin } from '../../../lib/auth/firebaseAdmin'


const InviteMentor = (props) => {
  const auth = props.auth
  const usertype = props.usertype
  const org_id = props.org_id

  return (
    <Layout title='Mentor Invite' needsAuth auth={auth} usertype={usertype}>
      <MentorInvite org_id={org_id} />
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

    return {
      props: { 
        auth: true,
        usertype: usertype,
        org_id: uid
      },
    };
  } catch (error) {
    console.log(error)
    return {
      props: {
        auth: false,
        usertype: null,
        org_id: null
      },
    };
  }
};

export default InviteMentor
