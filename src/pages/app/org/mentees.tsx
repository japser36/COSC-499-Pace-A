import UserList from '../../../components/UserDisplays/UserList'
import { getUserType, getOrgMentees } from '../../../utils/api'
import Layout from '../../../components/layout'
import nookies from 'nookies'
import { firebaseAdmin } from '../../../lib/auth/firebaseAdmin'

const Mentees = (props) => {
  const auth = props.auth
  const usertype = props.usertype
  const mentees = JSON.parse(props.mentees)

  return (
    <Layout title="Users" needsAuth auth={auth} usertype={usertype}>
      {mentees ? <UserList users={mentees} deletable/> 
      : <>TODO: display the copiable iframe code when org has no mentees</>}
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

export default Mentees
