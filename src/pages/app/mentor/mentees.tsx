import UserList from '../../../components/UserDisplays/UserList'
import { getUserType, getMentorsMentees } from '../../../utils/api'
import Layout from '../../../components/layout'
import nookies from 'nookies'
import { firebaseAdmin } from '../../../lib/auth/firebaseAdmin'

const Mentees = (props) => {
  const auth = props.auth
  const usertype = props.usertype
  const mentees = JSON.parse(props.mentees)

  return (
    <Layout title='Mentees' needsAuth auth={auth} usertype={usertype}>
      {
        mentees ? <UserList users={mentees}/> : <>TODO: display something when mentor has no mentees</>
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
        mentees: JSON.stringify(mentees)
      },
    };
  } catch (error) {
    console.log(error)
    return {
      props: {
        auth: false,
        usertype: null,
        mentees: null
      },
    };
  }
};

export default Mentees
